import "katex/dist/katex.css";
import "~/styles/github-markdown-light.css"; // TODO: 自己寫一份以縮小打包體積

import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

type MarkdownProps = React.ComponentProps<typeof Markdown>;

export function MyMarkdown(props: MarkdownProps) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      // rehypePlugins={[rehypeMathjax]}
      {...props}
    ></Markdown>
  );
}
