import shell from "shelljs";
import { type ComplexNode } from "~/app/book/create/importContentsModal";

if (!shell.which("pdftk")) {
  console.log("本腳本依賴於 pdftk ，請先安裝");
  shell.exit(1);
}

const filename = process.argv[2];
if (filename == undefined) {
  console.log("用法：pnpm extract-pdf [pdf 路徑]");
  shell.exit(1);
}

console.log(`偵測到 pdftk ，用其解析 pdf 檔案 ${filename}`);
const bookmarks = shell.exec(
  `pdftk ${filename} dump_data_utf8 | grep -E "BookmarkTitle|BookmarkLevel"`,
  { silent: true },
).stdout;

const lines = bookmarks.trim().split("\n");

const root: ComplexNode = {
  name: "根",
  children: [],
};

const stack: ComplexNode[] = [root];
for (let i = 0; i < lines.length; i += 2) {
  const title_line = lines[i];
  const level_line = lines[i + 1];
  if (title_line == undefined || level_line == undefined) {
    console.log("pdftk 解析所得章節標題與深度並未成對");
    console.log(`標題 = ${title_line}`);
    console.log(`深度 = ${level_line}`);
    shell.exit(1);
  }
  const title = title_line.split(" ").slice(1).join(" ");
  const level = parseInt(level_line.split(" ").slice(1).join(" "));

  while (stack.length > level + 1) {
    stack.pop();
  }

  const node = {
    name: title,
    children: [],
  };
  if (level == stack.length) {
    stack[stack.length - 1]!.children.push(node);
    stack.push(node);
  } else if (level == stack.length - 1) {
    stack[stack.length - 2]!.children.push(node);
    stack[stack.length - 1] = node;
  } else if (level > stack.length) {
    console.log("錯誤：章節跳級出現");
    shell.exit(1);
  }
}

console.log(JSON.stringify(root.children, null, 2));
