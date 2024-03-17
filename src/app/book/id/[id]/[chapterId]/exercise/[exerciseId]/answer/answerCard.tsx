"use client";
import { type User, type Answer } from "@prisma/client";
import { MyMarkdown } from "~/app/_components/myMarkdown";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Image,
} from "@nextui-org/react";
import { IoMdMore } from "react-icons/io";
import { relativeDate } from "~/utils/date";

type AnswerWithAuthor = Answer & { author: User };

// 根據格式顯示答案
function DisplayAnswer(props: { answer: AnswerWithAuthor }) {
  const { answer } = props;
  switch (answer.format) {
    case "MARKDOWN":
      return <MyMarkdown>{answer.text}</MyMarkdown>;
    case "IMAGE_URL":
      return <Image src={answer.text} alt="答案圖" />;
  }
}

export default function AnswerCard(props: { answer: AnswerWithAuthor }) {
  const { answer } = props;
  return (
    <Card>
      <CardHeader>
        <div className="flex w-full flex-row justify-between">
          <div>
            <div>{answer.author.name}</div>
            <div className="text-small text-gray-500">
              {relativeDate(answer.createDate)}
            </div>
          </div>
          <div>
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly variant="light">
                  <IoMdMore className="text-xl" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu disabledKeys={["edit", "copy", "enter"]}>
                <DropdownItem key="todo">TODO: 實作以下功能</DropdownItem>
                <DropdownItem key="edit">編輯</DropdownItem>
                <DropdownItem key="copy">複製網址</DropdownItem>
                <DropdownItem key="enter">進入答案頁</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <DisplayAnswer answer={answer} />
      </CardBody>
      <CardFooter>
        <div className="grid w-full grid-cols-2 space-x-2">
          {/* <Button variant="bordered" size="sm">
            批改
          </Button>
          <Button variant="bordered" size="sm">
            評論
          </Button> */}
        </div>
      </CardFooter>
    </Card>
  );
}
