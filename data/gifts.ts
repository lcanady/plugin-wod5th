import { IMStat } from "../deps.ts";

export const gifts: IMStat[] = [
  {
    name: "catfeet",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $eq: {
        stats: ["glory", "honor", "wisdom"],
        value: 1,
        error: "You must have at least 1 point in renown to take this gift.",
      },
    },
  },
  {
    name: "eyes of the owl",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $eq: {
        stats: ["glory", "honor", "wisdom"],
        value: 1,
        error: "You must have at least 1 point in renown to take this gift.",
      },
    },
  },
  {
    name: "hares leap",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $eq: {
        stats: ["glory", "honor", "wisdom"],
        value: 1,
        error: "You must have at least 1 point in renown to take this gift.",
      },
    },
  },
  {
    name: "prenumbral senses",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $eq: {
        stats: ["glory", "honor", "wisdom"],
        value: 1,
        error: "You must have at least 1 point in renown to take this gift.",
      },
    },
  },
  {
    name: "raging strike",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $eq: {
        stats: ["glory", "honor", "wisdom"],
        value: 1,
      },
    },
    error: "You must have at least 1 point in renown to take this gift.",
  },
  {
    name: "staredown",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $eq: {
        stats: ["glory", "honor", "wisdom"],
        value: 1,
      },
    },
    error: "You must have at least 1 point in renown to take this gift.",
  },
  {
    name: "sharpened senses",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $eq: {
        stats: ["glory", "honor", "wisdom"],
        value: 4,
      },
    },
    error: "You must have at least 1 point in renown to take this gift.",
  },
  {
    name: "spirit of the fray",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $eq: {
        stats: ["glory", "honor", "wisdom"],
        value: 4,
      },
    },
    error: "You must have at least 4 points of renown to take this gift.",
  },
  {
    name: "thwarting the arrow",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $eq: {
        stats: ["glory", "honor", "wisdom"],
        value: 4,
      },
    },
    error: "You must have at least 4 points of renown to take this gift.",
  },
  {
    name: "body shift",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $eq: {
        stats: ["glory", "honor", "wisdom"],
        value: 7,
      },
    },
    error: "You must have at least 7 points of renown to take this gift.",
  },
  {
    name: "jam technology",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $eq: {
        stats: ["glory", "honor", "wisdom"],
        value: 7,
      },
    },
    error: "You must have at least 7 points of renown to take this gift.",
  },
  {
    name: "tounge of the beasts",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $eq: {
        stats: ["glory", "honor", "wisdom"],
        value: 7,
      },
    },
    error: "You must have at least 7 points of renown to take this gift.",
  },
  {
    name: "blissful ignorance",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 2 },
          },
        },
        { $eq: { auspice: "ragabash" } },
      ],
    },
    error:
      "You must have at least 2 points of renown and be a ragabash to take this gift.",
  },
  {
    name: "crows laughter",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 2 },
          },
        },
        { $eq: { auspice: "ragabash" } },
      ],
    },
    error:
      "You must have at least 2 points of renown and be a ragabash to take this gift.",
  },
  {
    name: "gremlins",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 2 },
          },
        },
        { $eq: { auspice: "ragabash" } },
      ],
    },
    error:
      "You must have at least 2 points of renown and be a ragabash to take this gift.",
  },
  {
    name: "spider's song",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 2 },
          },
        },
        { $eq: { auspice: "ragabash" } },
      ],
    },
    error:
      "You must have at least 2 points of renown and be a ragabash to take this gift.",
  },
  {
    name: "blur of the milky eye",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 5 },
          },
        },
        { $eq: { auspice: "ragabash" } },
      ],
    },
    error:
      "You must have at least 5 points of renown and be a ragabash to take this gift.",
  },
  {
    name: "open seal",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 5 },
          },
        },
        { $eq: { auspice: "ragabash" } },
      ],
    },
    error:
      "You must have at least 5 points of renown and be a ragabash to take this gift.",
  },
  {
    name: "pulse of the prey",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 5 },
          },
        },
        { $eq: { auspice: "ragabash" } },
      ],
    },
    error:
      "You must have at least 5 points of renown and be a ragabash to take this gift.",
  },
  {
    name: "sent of running water",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 5 },
          },
        },
        { $eq: { auspice: "ragabash" } },
      ],
    },
    error:
      "You must have at least 5 points of renown and be a ragabash to take this gift.",
  },
  {
    name: "luna's blessing",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 8 },
          },
        },
        { $eq: { auspice: "ragabash" } },
      ],
    },
    error:
      "You must have at least 8 points of renown and be a ragabash to take this gift.",
  },
  {
    name: "thieving talons of the magpie",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 8 },
          },
        },
        { $eq: { auspice: "ragabash" } },
      ],
    },
    error:
      "You must have at least 8 points of renown and be a ragabash to take this gift.",
  },
  {
    name: "the thousand forms",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 8 },
          },
        },
        { $eq: { auspice: "ragabash" } },
      ],
    },
    error:
      "You must have at least 8 points of renown and be a ragabash to take this gift.",
  },
  {
    name: "welp body",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 8 },
          },
        },
        { $eq: { auspice: "ragabash" } },
      ],
    },
    error:
      "You must have at least 8 points of renown and be a ragabash to take this gift.",
  },
  {
    name: "ensnare spirit",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 2 },
            error:
              "You must have at least 2 points of renown to take this gift.",
          },
        },
        { $eq: { auspice: "theurge" }, error: "You must be a theurge." },
      ],
    },
  },
  {
    name: "mother's touch",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        { $eq: { auspice: "theurge" }, error: "You must be a theurge." },
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 2 },
            error:
              "You must have at least 2 points of renown to take this gift.",
          },
        },
      ],
    },
  },
  {
    name: "shadow sense",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        { $eq: { auspice: "theurge" }, error: "You must be a theurge." },
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 2 },
            error:
              "You must have at least 2 points of renown to take this gift.",
          },
        },
      ],
    },
  },
  {
    name: "sight from beyond",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        { $eq: { auspice: "theurge" }, error: "You must be a theurge." },
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 2 },
            error:
              "You must have at least 2 points of renown to take this gift.",
          },
        },
      ],
    },
  },
  {
    name: "banish spirit",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        { $eq: { auspice: "theurge" }, error: "You must be a theurge." },
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 5 },
            error:
              "You must have at least 5 points of renown to take this gift.",
          },
        },
      ],
    },
  },
  {
    name: "grasp from beyond",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        { $eq: { auspice: "theurge" }, error: "You must be a theurge." },
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 5 },
            error:
              "You must have at least 5 points of renown to take this gift.",
          },
        },
      ],
    },
  },
  {
    name: "mindspeak",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        { $eq: { auspice: "theurge" }, error: "You must be a theurge." },
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 5 },
            error:
              "You must have at least 5 points of renown to take this gift.",
          },
        },
      ],
    },
  },
  {
    name: "umbral tether",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        { $eq: { auspice: "theurge" }, error: "You must be a theurge." },
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 5 },
            error:
              "You must have at least 5 points of renown to take this gift.",
          },
        },
      ],
    },
  },
  {
    name: "command spirit",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        { $eq: { auspice: "theurge" }, error: "You must be a theurge." },
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 8 },
            error:
              "You must have at least 8 points of renown to take this gift.",
          },
        },
      ],
    },
  },
  {
    name: "feral regression",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        { $eq: { auspice: "theurge" }, error: "You must be a theurge." },
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 8 },
            error:
              "You must have at least 8 points of renown to take this gift.",
          },
        },
      ],
    },
  },
  {
    name: "living ward",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        { $eq: { auspice: "theurge" }, error: "You must be a theurge." },
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 8 },
            error:
              "You must have at least 8 points of renown to take this gift.",
          },
        },
      ],
    },
  },
  {
    name: "ancestral conviction",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $eq: {
            stats: ["glory", "honor", "wisdom"],
            value: 2,
            error:
              "You must have at least 2 points of renown to take this gift.",
          },
        },
        { $eq: { auspice: "philodox" }, error: "You must be a philodox." },
      ],
    },
  },
  {
    name: "gaia's candor",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $eq: {
            stats: ["glory", "honor", "wisdom"],
            value: 2,
            error:
              "You must have at least 2 points of renown to take this gift.",
          },
        },
        { $eq: { auspice: "philodox" }, error: "You must be a philodox." },
      ],
    },
  },
  {
    name: "porcupine's reprisal",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $eq: {
            stats: ["glory", "honor", "wisdom"],
            value: 2,
            error:
              "You must have at least 2 points of renown to take this gift.",
          },
        },
        { $eq: { auspice: "philodox" }, error: "You must be a philodox." },
      ],
    },
  },
  {
    name: "sense the true form",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $eq: {
            stats: ["glory", "honor", "wisdom"],
            value: 2,
            error:
              "You must have at least 2 points of renown to take this gift.",
          },
        },
        { $eq: { auspice: "philodox" }, error: "You must be a philodox." },
      ],
    },
  },
  {
    name: "beast's fealty",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 5 },
            error:
              "You must have at least 5 points of renown to take this gift.",
          },
        },
        { $eq: { auspice: "philodox" }, error: "You must be a philodox." },
      ],
    },
  },
  {
    name: "command the gathering",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 5 },
            error:
              "You must have at least 5 points of renown to take this gift.",
          },
        },
        { $eq: { auspice: "philodox" }, error: "You must be a philodox." },
      ],
    },
  },
  {
    name: "fangs of judgement",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 5 },
            error:
              "You must have at least 5 points of renown to take this gift.",
          },
        },
        { $eq: { auspice: "philodox" }, error: "You must be a philodox." },
      ],
    },
  },
  {
    name: "geas",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 8 },
            error:
              "You must have at least 8 points of renown to take this gift.",
          },
        },
        { $eq: { auspice: "philodox" }, error: "You must be a philodox." },
      ],
    },
  },
  {
    name: "oathbreaker's bane",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 8 },
            error:
              "You must have at least 8 points of renown to take this gift.",
          },
        },
        { $eq: { auspice: "philodox" }, error: "You must be a philodox." },
      ],
    },
  },
  {
    name: "strength of purpose",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 8 },
            error:
              "You must have at least 8 points of renown to take this gift.",
          },
        },
        { $eq: { auspice: "philodox" }, error: "You must be a philodox." },
      ],
    },
  },
  {
    name: "take the true form",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 8 },
            error:
              "You must have at least 8 points of renown to take this gift.",
          },
        },
        { $eq: { auspice: "philodox" }, error: "You must be a philodox." },
      ],
    },
  },
  {
    name: "take the true form",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 8 },
            error:
              "You must have at least 8 points of renown to take this gift.",
          },
        },
        { $eq: { auspice: "philodox" }, error: "You must be a philodox." },
      ],
    },
  },
  {
    name: "animal magentism",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 2 },
            error:
              "You must have at least 2 points of renown to take this gift.",
          },
        },
        { $eq: { auspice: "galliard" }, error: "You must be a galliard." },
      ],
    },
  },
  {
    name: "howl of assembly",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 2 },
            error:
              "You must have at least 2 points of renown to take this gift.",
          },
        },
        { $eq: { auspice: "galliard" }, error: "You must be a galliard." },
      ],
    },
  },
  {
    name: "song of rage",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 2 },
            error:
              "You must have at least 2 points of renown to take this gift.",
          },
        },
        { $eq: { auspice: "galliard" }, error: "You must be a galliard." },
      ],
    },
  },
  {
    name: "song of serenity",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 2 },
            error:
              "You must have at least 2 points of renown to take this gift.",
          },
        },
        { $eq: { auspice: "galliard" }, error: "You must be a galliard." },
      ],
    },
  },
  {
    name: "call the ridden",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 5 },
            error:
              "You must have at least 5 points of renown to take this gift.",
          },
        },
        { $eq: { auspice: "galliard" }, error: "You must be a galliard." },
      ],
    },
  },
  {
    name: "eyes of the cobra",
    type: "gift",
    template: ["werewolf"],
    values: [1],
    check: {
      $and: [
        {
          $gte: {
            stats: ["glory", "honor", "wisdom"],
            condition: { $gte: 5 },
            error:
              "You must have at least 5 points of renown to take this gift.",
          },
        },
        { $eq: { auspice: "galliard" }, error: "You must be a galliard." },
      ],
    },
  },
];
