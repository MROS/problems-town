"use client";
import { type User, type Answer } from "@prisma/client";
import { MyMarkdown } from "~/app/_components/myMarkdown";

type AnswerWithAuthor = Answer & { author: User };

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
