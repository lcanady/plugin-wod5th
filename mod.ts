import { __dirname, join, plugins } from "./deps.ts";

export default () => {
  console.log("Loading Commands: ", join(__dirname, "./commands"));
  plugins(join(__dirname, "./commands"));
};
