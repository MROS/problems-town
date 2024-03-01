import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";
// TODO: 寫自己的 mathjax 外掛

type MarkdownProps = React.ComponentProps<typeof Markdown>;

export function MyMarkdown(props: MarkdownProps) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
      rehypePlugins={[rehypeMathjax]}
      {...props}
    ></Markdown>
  );
}
