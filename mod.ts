import { __dirname, join, loadTxtDir, plugins, txtFiles } from "./deps.ts";

export default () => {
  loadTxtDir(join(__dirname, "./text"));
  plugins(join(__dirname, "./commands"));
};
