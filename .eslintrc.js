// .eslintrc.js

// Rule to prevent importing individual files from components folder
const createComponentImportRule = (folderName) => ({
  target: "./src/features",
  from: `./src/components/${folderName}`,
  except: ["./index.ts", "./styles.css", "./types.ts"],
  message: `Please import ${folderName} from "@/deprecated-components/${folderName}" instead of individual files.`,
});

const componentFolders = ["icon", "button", "feedback", "toggle"];

module.exports = {
  extends: "next/core-web-vitals",
  plugins: ["import"],
  // [NOTE] currently disabled
  // rules: {
  //   "import/no-restricted-paths": [
  //     "error",
  //     {
  //       zones: componentFolders.map(createComponentImportRule),
  //     },
  //   ],
  // },
};
