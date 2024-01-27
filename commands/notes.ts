import { footer } from "../deps.ts";
import { capString, divider } from "../deps.ts";
import {
  addCmd,
  canEdit,
  header,
  INote,
  moniker,
  Obj,
  send,
  target,
} from "../deps.ts";

export default () => {
  addCmd({
    name: "notes/edit",
    // +note[/<category>] <title> = <text>
    pattern: /^[@\+]?note[s]?(?:\/(\w+))?\s+(.*)\s*=\s*(.*)/i,
    lock: "connected !approved|storyteller+",
    hidden: true,
    exec: async (ctx, args) => {
      const categories = [
        "general",
        "backgrounds",
        "story",
        "merits",
        "flaws",
        "items",
        "specialties",
        "other",
      ];

      const en = await Obj.get(ctx.socket.cid);
      if (!en) return;

      if (args[0] && !categories.includes(args[0].toLowerCase())) {
        return send(
          [ctx.socket.id],
          `%chGame>%cn Invalid category. Valid categories are: ${
            categories.join(", ")
          }.`,
        );
      }

      en.data.notes ||= [];

      const note = en.data.notes.find((n: any) =>
        n.title === args[1].toLowerCase()
      );
      if (note) {
        if (!args[2]) {
          en.data.notes = en.data.notes.filter((n: any) =>
            n.title !== args[1].toLowerCase()
          );
        } else {
          note.text = args[2].trim();
        }
      } else {
        en.data.notes.push({
          title: args[1].toLowerCase(),
          text: args[2].trim(),
          date: Date.now(),
          category: args[0] || "general",
          hidden: false,
          locked: false,
          approved: false,
        });
      }

      await en.save();

      return await send(
        [ctx.socket.id],
        `%chGame>%cn Your Note %ch${capString(args[1])}%cn ${
          args[2] ? "saved" : "removed"
        }.`,
      );
    },
  });

  addCmd({
    name: "note/read",
    // note [<player>\]<title>|<id>
    pattern: /^[@\+]?note\/view\s+(.*)/i,
    lock: "connected",
    exec: async (ctx, args) => {
      const en = await Obj.get(ctx.socket.cid);
      if (!en) return;

      let [tar, title] = args[0].split("/");
      if (!title) {
        title = tar;
        tar = "me";
      }

      const targ = await target(en.dbobj, tar);
      if (!targ) return send([ctx.socket.id], "%chGame>%cn Invalid target.");

      targ.data ||= {};
      targ.data.notes ||= [];

      // make sure they have permission to read the note.   If they can edit
      // they can read all notes.  Otherwise, they can only read approved
      // public notes.

      // if the title is given, match the title.  if the #id is given, match
      // the id  is a number that can be prefixed with a #.  If no # is given,
      // then the number is assumed to be an id.

      let note: INote | undefined;
      if (title.startsWith("#") || !isNaN(+title)) {
        const idx = title.startsWith("#") ? +title.slice(1) : +title;
        if (idx) {
          note = targ.data.notes[idx - 1];
        }
      } else {
        note = targ.data.notes.find((n: any) => n.title === title);
      }

      // if they can read the note, show it.  Otherwise, show an error.
      if (note) {
        if (canEdit(en.dbobj, targ) || note.approved && !note.hidden) {
          let output = header("NOTE for: " + moniker(targ)) + "\n";
          output += divider(capString(note.title)) + "\n";
          output += note.text + "\n";
          output += footer();
          await send([ctx.socket.id], output);
        } else {
          await send([ctx.socket.id], "%chGame>%cn Permission denied.");
        }
      } else {
        await send([ctx.socket.id], "%chGame>%cn Note not found.");
      }
    },
  });

  addCmd({
    name: "notes",
    pattern: /^[@\+]?note[s]?(?:\s+(.*))?/i,
    lock: "connected !approved|storyteller+",
    exec: async (ctx, args) => {
      const en = await Obj.get(ctx.socket.cid);
      if (!en) return;

      let tar = args[0];

      if (!tar) {
        tar = "me";
      } else {
        tar = tar.trim().toLowerCase();
      }

      const targ = await target(en.dbobj, tar);
      if (!targ) return send([ctx.socket.id], "%chGame>%cn Invalid target.");
      if (!canEdit(en.dbobj, targ)) {
        return send([ctx.socket.id], "%chGame>%cn Permission denied.");
      }

      targ.data ||= {};
      targ.data.notes ||= [];

      if (targ.data.notes.length === 0) {
        return send([ctx.socket.id], "%chGame>%cn No notes found.");
      }

      // get the notes that the user can see.  If they can edit the object
      // they can see all notes.  Otherwise, they can only see approved
      // public notes.

      const notes = targ.data.notes.filter((n: any) => {
        if (canEdit(en.dbobj, targ)) return true;
        return n.approved && !n.hidden;
      });

      // =========================[ NOTES for Player ]==========================
      // --------------------------[ General Notes ]----------------------------
      // * 1. This is a Note title.
      //   3. Another Note TItle.
      // ------------------------[ Background Notes ]--------------------------
      // * 2. This is a third Note title.
      // =======================================================================
      // To view a note, type: 'note [<player>\]<title>'.
      // * = Approved note.

      // list notes.
      let output = header("NOTES for: " + moniker(targ)) + "\n";

      const cats = new Set<string>();
      for (const note of notes as INote[]) {
        cats.add(note.category);
      }

      for (const cat of cats) {
        output += divider(capString(cat) + " Notes") + "\n";
        for (const note of notes) {
          if (note.category === cat) {
            // get the index of the note.
            const idx = targ.data.notes.indexOf(note);
            output += note.approved ? " * " : "   ";
            output += `${("#" + (idx + 1)).padStart(3)}. %cc${
              capString(note.title)
            }%cn\n`;

            // show the first 78 cgars of the note, ending with an ellipsis if it's longer.
            output += `        ${note.text?.substr(0, 67)}${
              note.text?.length > 67 ? "..." : ""
            }\n`;
          }
        }
      }

      output += footer();
      output += "\nTo view a note, type: 'note [<player>\]<title>'.\n";
      output += "* = Approved note.\n";

      await send([ctx.socket.id], output);
    },
  });
};
