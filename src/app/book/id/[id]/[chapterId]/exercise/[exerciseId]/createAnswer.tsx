/* eslint-disable @next/next/no-img-element */
"use client";
import { Radio, RadioGroup, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import ImageUrlAnswerForm from "./imageForm";
import MarkdownAnswerForm from "./markdownForm";

import { create } from "zustand";
import { persist } from "zustand/middleware";

enum AnswerFormat {
  MARKDOWN = "MARKDOWN",
  IMAGE_URL = "IMAGE_URL",
}

interface FormatState {
  answerFormat: AnswerFormat;
  setAnswerFormat: (answerFormat: AnswerFormat) => void;
}

// 用戶會傾向採用同樣的方式提交答案，故將偏好存至 localStorage
const useStore = create<FormatState>()(
  persist(
    (set) => ({
      answerFormat: AnswerFormat.MARKDOWN,
      setAnswerFormat: (answerFormat: AnswerFormat) => set({ answerFormat }),
    }),
    { name: "prefered-answer-type" },
  ),
);

function AnswerForm(props: { exerciseId: string }) {
  const { answerFormat, setAnswerFormat } = useStore();
  const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  return (
    <div>
      <RadioGroup
        className="mb-6"
        orientation="horizontal"
        value={answerFormat}
        onChange={(event) =>
          setAnswerFormat(event.target.value as AnswerFormat)
        }
      >
        {/* // NOTE: 需保證 value 皆爲 AnswerType */}
        <Radio value={AnswerFormat.MARKDOWN}>Markdown</Radio>
        <Radio
          isDisabled={imgbbApiKey == undefined}
          value={AnswerFormat.IMAGE_URL}
        >
          {imgbbApiKey ? "圖片" : "圖片（未啓用）"}
        </Radio>
      </RadioGroup>
      {(() => {
        switch (answerFormat) {
          case AnswerFormat.MARKDOWN:
            return <MarkdownAnswerForm exerciseId={props.exerciseId} />;
          case AnswerFormat.IMAGE_URL:
            return (
              <ImageUrlAnswerForm
                exerciseId={props.exerciseId}
                apiKey={imgbbApiKey!}
              />
            );
        }
      })()}
    </div>
  );
}

export default function AuthenticatedAnswerForm(props: { exerciseId: string }) {
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
