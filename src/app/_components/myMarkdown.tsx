import "katex/dist/katex.css";
import "~/styles/github-markdown-light.css"; // TODO: 自己寫一份以縮小打包體積

import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { visit } from "unist-util-visit";

type MarkdownProps = React.ComponentProps<typeof Markdown> & {
  headingIncrease?: number;
};

function remarkHeadingIncrease(options = { depth: 0 }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (tree: any) {
    visit(tree, function (node) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (node.type === "heading") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        node.depth += options.depth;
      }
    });
  };
}

export function MyMarkdown(props: MarkdownProps) {
  const remarkPlugins = [
    remarkGfm,
    remarkBreaks,
    remarkMath,
    [remarkHeadingIncrease, { depth: props.headingIncrease ?? 0 }],
  ];
  return (
    <Markdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={[rehypeKatex]}
      {...props}
    ></Markdown>
  );
}
