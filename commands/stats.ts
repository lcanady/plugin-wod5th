import {
  addCmd,
  allStats,
  canEdit,
  capString,
  flags,
  IMStatEntry,
  moniker,
  Obj,
  send,
  target,
} from "../deps.ts";
import { formatValue } from "../lib/formatValue.ts";
import { setStat } from "../lib/setStat.ts";

// +stats <stat> = <value>

export default () => {
  addCmd({
    name: "templates",
    pattern: /^[@\+]?templates$/i,
    lock: "connected",
    hidden: true,
    exec: async (ctx) => {
      const en = await Obj.get(ctx.socket.cid);
      if (!en) return;

      const fullStat = allStats.find((s) => s.name === "template");
      if (!fullStat) return send([ctx.socket.id], "%chGame>%cn Invalid stat.");

      return send(
        [ctx.socket.id],
        `%chGame>%cn Valid templates: ${
          fullStat.values
            .map((s: any) => `%ch${capString(s)}%cn`)
            .join(", ")
        }`,
      );
    },
  });

  addCmd({
    name: "template",
    pattern: /^[@\+]?template\s+(.*)/i,
    lock: "connected !approved|storyteller+",
    hidden: true,

    exec: async (ctx, args) => {
      let tar = "me",
        template = "";
      const en = await Obj.get(ctx.socket.cid);
      if (!en) return;

      // if args[0] contains an =, then we need to split it up.
      if (args[0].includes("=")) {
        const parts = args[0].split("=");

        // if parts[0] does not equal me, then we need to check if the enactor is an admin.
        // if not, end the command and tell the enactor 'Permssion denied'
        if (
          parts[0].trim().toLowerCase() !== "me" &&
          !flags.check(en.flags, "storyteller+")
        ) {
          return send([ctx.socket.id], "%chGame>%cn Permission denied.");
        }

        if (parts.length > 1) {
          tar = parts[0].trim().toLowerCase();
          template = parts[1].trim().toLowerCase();
        }
      } else {
        template = args[0].trim().toLowerCase();
      }

      const targ = await target(en.dbobj, tar);
      if (!targ) return send([ctx.socket.id], "%chGame>%cn Invalid target.");

      const fullStat = allStats.find((s) => s.name === "template");
      if (!fullStat) return send([ctx.socket.id], "%chGame>%cn Invalid stat.");

      if (!fullStat.values.includes(template)) {
        return send(
          [ctx.socket.id],
          `%chGame>%cn Invalid template. Must be one of: ${
            fullStat.values
              .map((s: any) => `%ch${capString(s)}%cn`)
              .join(", ")
          }`,
        );
      }

      if (targ.data?.stats?.find((s: IMStatEntry) => s.name === "template")) {
        return send(
          [ctx.socket.id],
          `%chGame>%cn ${
            moniker(
              targ,
            )
          } already has a template set. See: '%chhelp +stats/reset%cn'.`,
        );
      }

      try {
        const name = await setStat(targ, "template", template.trim());
        await targ.save();
        return await send(
          [ctx.socket.id],
          `%chGame>%cn ${
            moniker(targ)
          }'s template set to: %ch${template.trim()?.toUpperCase()}%cn.`,
        );
      } catch (error: any) {
        return send([ctx.socket.id], `%ch%crERROR>%cn ${error.message}`);
      }
    },
  });

  addCmd({
    name: "stats/reset",
    pattern: /^[@\+]?stats\/reset(?:\s+(.*))?$/i,
    lock: "connected !approved|admin+",
    exec: async (ctx, [tar]) => {
      const en = await Obj.get(ctx.socket.cid);
      if (!en) return;

      if (!tar) tar = "me";
      const targ = await target(en.dbobj, tar);
      if (!targ) return send([ctx.socket.id], "%chGame>%cn Invalid target.");

      if (!canEdit(en.dbobj, targ)) {
        return send([ctx.socket.id], "%chGame>%cn permission denied.");
      }

      if (!targ.data?.stats?.find((s: IMStatEntry) => s.name === "template")) {
        return send(
          [ctx.socket.id],
          `%chGame>%cn ${
            moniker(
              targ,
            )
          } has no template set. See: '%chhelp +template%cn'.`,
        );
      }

      await send(
        [ctx.socket.id],
        "%chGame>%cn To confirm reset, type '%chstats/reset/confirm <target>%cn'",
      );
    },
  });

  addCmd({
    name: "stats/reset/confirm",
    pattern: /^[@\+]?stats\/reset\/confirm\s+(.*)$/i,
    lock: "connected !approved|admin+",
    hidden: true,
    exec: async (ctx, [tar]) => {
      const en = await Obj.get(ctx.socket.cid);
      if (!en) return;

      if (!tar) tar = "me";
      const targ = await target(en.dbobj, tar);
      if (!targ) return send([ctx.socket.id], "%chGame>%cn Invalid target.");

      if (!canEdit(en.dbobj, targ)) {
        return send([ctx.socket.id], "%chGame>%cn permission denied.");
      }

      en.dbobj.data = {
        ...en.dbobj.data,
        stats: [],
        damage: {
          physical: { superficial: 0, aggravated: 0 },
          mental: { superficial: 0, aggravated: 0 },
        },
      };

      await en.save();
      return send(
        [ctx.socket.id],
        `%chGame>%cn ${moniker(targ)} has been reset.`,
      );
    },
  });

  addCmd({
    name: "stats",
    pattern: /^[@\+]?stat[s]?(?:\/(.*))?\s+(.*)\s*=\s*(.*)?$/i,
    hidden: true,
    lock: "connected !approved|admin+",
    exec: async (ctx, args) => {
      const en = await Obj.get(ctx.socket.cid);
      if (!en) return;
      let tar;
      let [temp, stat, value] = args;
      // first peform some basic checks.
      // Make sure the character can edit the target.
      const parts = args[1].split("/");
      if (parts.length > 1) {
        tar = parts[0].trim().toLowerCase();
        stat = parts[1].trim().toLowerCase();
      }

      value ||= "0";

      // Either use the target or the enactor if no target exists.
      const tarObj = await target(en, tar || "me");
      if (!tarObj) return send([ctx.socket.id], "%chGame>%cn Invalid target.");

      // Make sure the character can edit the target.
      if (!canEdit(en.dbobj, tarObj)) {
        return send([ctx.socket.id], "%chGame>%cn Invalid target.");
      }

      // Check to see if the target has a template set first.
      if (
        !tarObj.data?.stats?.find((s: IMStatEntry) => s.name === "template") &&
        stat !== "template"
      ) {
        return send(
          [ctx.socket.id],
          `%chGame>%cn ${moniker(tarObj)} has no template.`,
        );
      }

      // make sure if temp that it actually says 'temp'.
      if (temp && temp.toLowerCase() !== "temp") {
        return send(
          [ctx.socket.id],
          `%chGame>%cn Invalid temp value.  Must be 'temp'.`,
        );
      }

      try {
        const name = (await setStat(tarObj, stat, value, !!temp)) || stat;
        let [val, _] = value.split("/");

        console.log(val);
        const disp = +val ? formatValue(tarObj, name) : "removed";

        return await send(
          [ctx.socket.id],
          `%chGame>%cn ${moniker(tarObj)}'s stat %ch${
            temp ? "TEMP-" : ""
          }${name?.toUpperCase()}%cn set to: %ch${disp}%cn`,
        );
      } catch (error: any) {
        return send([ctx.socket.id], `%chGame>%cn ${error.message}`);
      }
    },
  });
};
