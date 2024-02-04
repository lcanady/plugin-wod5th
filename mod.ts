import { __dirname, join, loadTxtDir, plugins } from "./deps.ts";

export default () => {
  console.log("Loading...");
  // loadTxtDir(join(__dirname, "./text"));
  // plugins(join(__dirname, "./plugins"));
  // plugins(join(__dirname, "./commands"));
  return "Loaded.";
};
