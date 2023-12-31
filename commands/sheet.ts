import { addCmd, footer, header, moniker, Obj, send, target } from "../deps.ts";
import { advantages } from "../handlers/advantagesHandler.ts";
import { attributes } from "../handlers/attributesHandler.ts";
import { bio } from "../handlers/bioHandler.ts";
import { disciplines } from "../handlers/disciplinesHandler.ts";
import { health } from "../handlers/healthHandler.ts";
import { other } from "../handlers/otherHandler.ts";
import { skills } from "../handlers/skillsHandler.ts";
import { getStat } from "../lib/getStats.ts";

export default () => {
  addCmd({
    name: "sheet",
    pattern: /^[@\+]?sheet(?:\s+(.*))?$/i,
    lock: "connected",
    exec: async (ctx, [tar]) => {
      let tarObj;

      const en = await Obj.get(ctx.socket.cid);
      if (!en) return;

      // handle target.
      if (tar) {
        const targetResult = await target(en.dbobj, tar);
        if (targetResult !== false) {
          tarObj = await Obj.get(targetResult?.id);
        }
      } else {
        tarObj = en;
      }

      if (!tarObj) {
        return send([ctx.socket.id], "%chGame>%cn Target not found.");
      }

      // if the target doesn't have a splat, we can't do anything.
      const splat = await getStat(tarObj.dbobj, "splat");
      if (!splat) {
        // if the target is the enactor, send enactor message
        if (tarObj.id === en.id) {
          return send([ctx.socket.id], "%chGame>%cn You don't have a splat.");
        } else {
          // otherwise send target message
          return send(
            [ctx.socket.id],
            `%chGame>%cn ${moniker(tarObj.dbobj)} doesn't have a splat.`,
          );
        }
      }

      let output = header(` Sheet for: %ch${moniker(tarObj.dbobj)}%cn `);
      output += await bio(tarObj);
      output += await attributes(tarObj);
      output += await skills(tarObj);
      output += await advantages(tarObj);
      output += await disciplines(tarObj);
      output += await health(tarObj);
      output += await other(tarObj);
      output += footer();

      send([ctx.socket.id], output);
    },
  });
};
