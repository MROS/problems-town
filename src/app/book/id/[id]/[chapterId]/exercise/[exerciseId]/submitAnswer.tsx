"use client";
import { Button, Link, Spinner, Tab, Tabs, Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  BsArrowsCollapseVertical,
  BsArrowsExpandVertical,
} from "react-icons/bs";
import { MyMarkdown } from "~/app/_components/myMarkdown";
import { api } from "~/trpc/react";

function AnswerTextArea(props: {
  answer: string;
  setAnswer: (value: string) => void;
}) {
  return (
    <div>
      <Textarea
        radius="none"
        value={props.answer}
        minRows={20}
        maxRows={100}
        onValueChange={props.setAnswer}
        variant="bordered"
      />
    </div>
  );
}

function Preview(props: { answer: string }) {
  return (
    <div className="markdown-body w-full overflow-auto text-wrap border-2 p-[8px]">
      {/* 加上 markdown-body 以啓用 ~/styles/github-markdow-light.css */}
      <MyMarkdown>{props.answer}</MyMarkdown>
    </div>
  );
}

function AnswerForm(props: { exerciseId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [answer, setAnswer] = useState("");
  const [expandWidth, setExpandWidth] = useState(false);
  const createAnswer = api.answer.create.useMutation();

  const submit = () => {
    createAnswer.mutate(
      { exerciseId: props.exerciseId, text: answer },
      {
        onSuccess: () => {
          router.push(`${pathname}/answer`);
          router.refresh();
        },
      },
    );
  };

  let wrapperClass = "relative h-96";
  if (expandWidth) {
    wrapperClass = "absolute left-0 w-full px-2 h-96";
  }
  return (
    <div className={wrapperClass}>
      <div className={`absolute ${expandWidth ? "right-3" : "right-1"}`}>
        <Button
          isIconOnly
          variant="bordered"
          onPress={() => setExpandWidth(!expandWidth)}
        >
          {expandWidth ? (
            <BsArrowsCollapseVertical />
          ) : (
            <BsArrowsExpandVertical />
          )}
        </Button>
      </div>
      <Tabs variant="light">
        <Tab title="撰寫">
          <AnswerTextArea answer={answer} setAnswer={setAnswer} />
        </Tab>
        <Tab title="預覽">
          <Preview answer={answer} />
        </Tab>
        <Tab title="並列">
          {/* TODO: 同步捲動 */}
          <div className="grid h-full grid-cols-2">
            <AnswerTextArea answer={answer} setAnswer={setAnswer} />
            <Preview answer={answer} />
          </div>
        </Tab>
      </Tabs>
      <span className="text-sm text-gray-500">
        習題支援{" "}
        <Link size="sm" target="_blank" href="https://github.github.com/gfm/">
          github 風格 的 Markdown 語法
        </Link>
        ，以及{" "}
        <Link size="sm" target="_blank" href="https://katex.org/">
          Katex 數學式
        </Link>
        （$$ 包夾） ，詳見
        <Link size="sm" target="_blank" href="/docs/markdown">
          本站 Markdown 語法說明
        </Link>
        。
      </span>
      <div className="flex flex-row justify-end pb-10">
        <Button color="primary" onPress={submit}>
          繳交
        </Button>
        {createAnswer.error?.message}
      </div>
    </div>
  );
}

export default function SubmitAnswer(props: { exerciseId: string }) {
  const { status } = useSession();
  switch (status) {
    case "authenticated":
      return <AnswerForm exerciseId={props.exerciseId} />;
    case "loading":
      return <Spinner />;
    case "unauthenticated":
      return <div>請登入</div>;
  }
}
