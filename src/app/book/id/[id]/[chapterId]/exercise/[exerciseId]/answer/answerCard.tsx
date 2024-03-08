"use client";
import { type Answer } from "@prisma/client";
import { type Author } from "next/dist/lib/metadata/types/metadata-types";
import { MyMarkdown } from "~/app/_components/myMarkdown";

type AnswerWithAuthor = Answer & { author: Author };

export default function AnswerCard(props: { answer: AnswerWithAuthor }) {
  const { answer } = props;
  return (
    <div>
      <div>{answer.author.name}</div>
      <div>{answer.createDate.toDateString()}</div>
      <MyMarkdown>{answer.text}</MyMarkdown>
    </div>
  );
}
