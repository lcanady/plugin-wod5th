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
];
