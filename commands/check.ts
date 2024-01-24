import { addCmd, footer, header, Obj, send, target } from "../deps.ts";
import { getStat } from "../lib/getStats.ts";

export default () => {
  addCmd({
    name: "stats/check",
    pattern: /^[@\+]?check(?:\s+(.*))?/i,
    lock: "connected !approved|storyteller+",
    hidden: true,
    exec: async (ctx, args) => {
      const en = await Obj.get(ctx.socket.cid);
      let tar = "me";

      if (!en) return;

      if (args[0]) {
        tar = args[0].trim().toLowerCase();
      }

      const targ = await target(en, tar);
      if (!targ || !targ.data) {
        return send([ctx.socket.id], "%ch%crCheck>%cn Invalid target.");
      }

      const stats = targ.data.stats;
      const template = await getStat(targ, "template");

      if (!template) {
        return send([ctx.socket.id], "%ch%crCheck>%cn Invalid template.");
      }

      // get the handler for their template.
      const handler = await import(`../templates/${template}.ts`);

      if (!handler) {
        return send([ctx.socket.id], "%ch%crCheck>%cn Invalid template.");
      }

      // get the handler for their template.
      try {
        const result = await handler.default(targ);
        let output = header("Chargen  Check for: " + targ.name) + "\n";
        output += result;
        output += footer();
        return send([ctx.socket.id], output);
      } catch (error) {
        return send([ctx.socket.id], `%ch%crCheck>%cn ${error}`);
      }
    },
  });
};
