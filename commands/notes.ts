import { capString } from "../deps.ts";
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
        return send([ctx.socket.id], "%chGame>%cn Invalid category.");
      }

      const note = en.data.notes.find((n: any) =>
        n.title === args[1].toLowerCase()
      );
      if (note) {
        if (!args[2]) {
          en.data.notes = en.data.notes.filter((n: any) =>
            n.title !== args[1].toLowerCase()
          );
        } else {
          note.text = args[1];
        }
      } else {
        en.data.notes.push({
          title: args[1].toLowerCase(),
          text: args[3],
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
      for (const note of targ.data.notes) {
        cats.add(note.category);
      }

      for (const cat of cats) {
        output += header(capString(cat) + " Notes") + "\n";
        for (const note of targ.data.notes) {
          if (note.category === cat) {
            output += `* ${note.title}\n`;
          }
        }
      }
    },
  });
};
