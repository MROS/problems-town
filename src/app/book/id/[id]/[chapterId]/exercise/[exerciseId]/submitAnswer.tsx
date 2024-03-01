"use client";
import { Button, Spinner, Tab, Tabs, Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  BsArrowsCollapseVertical,
  BsArrowsExpandVertical,
} from "react-icons/bs";
import Markdown from "react-markdown";

function AnswerTextArea(props: {
  answer: string;
  setAnswer: (value: string) => void;
}) {
  return (
    <div>
      <Textarea
        radius="none"
        classNames={{ input: "min-h-96" }}
        value={props.answer}
        onValueChange={props.setAnswer}
        variant="bordered"
      />
    </div>
  );
}

function Preview(props: { answer: string }) {
  return (
    <div className="border-2 p-[8px]">
      {/* 加上 markdown-body 以啓用 ~/styles/github-markdow-light.css */}
      <div className="markdown-body h-96 w-full overflow-y-auto text-wrap">
        <Markdown>{props.answer}</Markdown>
      </div>
    </div>
  );
}

function AnswerForm() {
  const [answer, setAnswer] = useState("");
  const [expandWidth, setExpandWidth] = useState(false);
  return (
    <div
      className={`${
        expandWidth
          ? "w-max-screen-lg absolute left-0 w-screen px-2"
          : "relative"
      }`}
    >
      <div className="absolute right-0">
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
      <Tabs variant="light" classNames={{ panel: "pb-0" }}>
        <Tab title="撰寫">
          <AnswerTextArea answer={answer} setAnswer={setAnswer} />
        </Tab>
        <Tab title="預覽">
          <Preview answer={answer} />
        </Tab>
        <Tab title="並列">
          <div className="grid grid-cols-2">
            <AnswerTextArea answer={answer} setAnswer={setAnswer} />
            <Preview answer={answer} />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default function SubmitAnswer() {
  const { status, data: session } = useSession();
  switch (status) {
    case "authenticated":
      return <AnswerForm />;
    case "loading":
      return <Spinner />;
    case "unauthenticated":
      return <div>請登入</div>;
  }
}
