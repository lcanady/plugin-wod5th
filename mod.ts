import { __dirname, join, plugins } from "./deps.ts";

export default () => {
  plugins(join(__dirname, "./commands"));
};
