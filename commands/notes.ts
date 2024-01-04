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
    name: "notes",
    pattern: /^[@\+]?note[s]?\s+(.*)\s*=\s*(.*)/i,
    lock: "connected !approved|storyteller+",
    hidden: true,
    exec: async (ctx, args) => {
      const en = await Obj.get(ctx.socket.cid);
      if (!en) return;

      let [tar, title] = args[0].split("/");

      if (!title) {
        tar = "me";
        title = args[0];
      } else {
        tar = tar.trim().toLowerCase();
        title = title.trim();
      }

      const targ = await target(en.dbobj, tar);
      if (!targ) return send([ctx.socket.id], "%chGame>%cn Invalid target.");
      if (!canEdit(en.dbobj, targ)) {
        return send([ctx.socket.id], "%chGame>%cn Permission denied.");
      }

      targ.data ||= {};
      targ.data.notes ||= [] as INote[];

      const note = targ.data.notes.find((n: any) => n.title === title);
      if (note) {
        if (!args[1]) {
          targ.data.notes = targ.data.notes.filter((n: any) =>
            n.title !== title
          );
        } else {
          note.text = args[1];
        }
      } else {
        targ.data.notes.push({
          title,
          text: args[1],
          date: Date.now(),
          hidden: false,
          locked: false,
          approved: false,
        });
      }

      await targ.save();

      if (tar === "me") {
        return await send(
          [ctx.socket.id],
          `%chGame>%cn Your Note %ch${title.toUpperCase()}%cn ${
            args[1] ? "saved" : "removed"
          }.`,
        );
      }

      await send(
        [ctx.socket.id],
        `%chGame>%cn ${moniker(targ)}'s Note %ch${title.toUpperCase()}%cn ${
          args[1] ? "saved" : "removed"
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

      // list notes.
      let output = header("Notes for: " + moniker(targ));
      for (let i = 0; i < targ.data.notes.length; i++) {
        output += `%r${i + 1}. %ch${targ.data.notes[i].title.toUpperCase()}%cn`;
      }

      await send([ctx.socket.id], output);
    },
  });
};
