"use client";
import {
  Button,
  Checkbox,
  Divider,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { ArrayInput, MyInput, ZodInput } from "~/app/_components/myInput";
import { ImportContents } from "./importContentsModal";
import { ContentsTree, type TreeNode } from "./contentsTree";
import { z } from "~/utils/chineseZod";

export const ALL_BOOK_FORMS = ["現代出版品", "電子書", "古籍"] as const;

// export type BookForm = "現代出版品" | "電子書" | "古籍";
export type BookForm = (typeof ALL_BOOK_FORMS)[number];

const BOOK_FORMS: { name: BookForm; disabled?: boolean }[] = [
  { name: "現代出版品" },
  { name: "電子書", disabled: true },
  { name: "古籍", disabled: true },
];

const bookNameSchema = z.string().min(1).max(256);
const bookAuthorSchema = z.string().min(1).max(128);
const ISBNSchema = z.string().length(13);

export default function NewBook() {
  const [bookForm, setBookForm] = useState("現代出版品");
  const [bookName, setBookName] = useState("");
  const [bookAuthors, setBookAuthors] = useState([""]);
  const [isTranslated, setIsTranslated] = useState(false);
  const [bookTranslators, setBookTranslators] = useState<null | string[]>(null);
  const [bookISBN, setBookISBN] = useState("");
  const [bookContents, setBookContents] = useState<TreeNode[]>([]);

  return (
    <main className="flex grow flex-col">
      <div className="flex w-full flex-col items-center px-4 pt-10">
        <div className="flex w-full max-w-lg flex-col">
          <h1 className="text-lg font-bold">新增書籍</h1>
          <Divider className="mb-4 mt-2" />
          <div className="space-y-10">
            <Select
              isRequired
              className="mb-4"
              label="成書形式"
              placeholder="現代出版品"
              labelPlacement="outside"
              selectedKeys={[bookForm]}
              onChange={(e) => setBookForm(e.target.value)}
              disabledKeys={BOOK_FORMS.filter(
                (bookForm) => bookForm.disabled,
              ).map((bookForm) => bookForm.name)}
            >
              {BOOK_FORMS.map((bookForm) => {
                const name = bookForm.name;
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </Select>
            <ZodInput
              zodSchema={bookNameSchema}
              value={bookName}
              onValueChange={setBookName}
              isRequired
              labelPlacement="outside"
              placeholder="連城訣"
              label="書名"
            />
            <ArrayInput
              zodSchema={bookAuthorSchema}
              values={bookAuthors}
              onValuesChange={setBookAuthors}
              addText="新增另一位作者"
              isRequired
              labelPlacement="outside"
              placeholder="金庸"
              label="作者"
            />
            <div className="!mt-4">
              <Checkbox
                size="sm"
                isSelected={isTranslated}
                onValueChange={(value) => {
                  setIsTranslated(value);
                  if (value == false) {
                    setBookTranslators(null);
                  } else {
                    setBookTranslators([""]);
                  }
                }}
              >
                本書爲翻譯書籍？
              </Checkbox>
              {isTranslated && bookTranslators ? (
                <div className="ml-6 mt-2">
                  <ArrayInput
                    zodSchema={bookAuthorSchema}
                    values={bookTranslators}
                    onValuesChange={setBookTranslators}
                    addText="新增另一位譯者"
                    isRequired
                    placeholder="請輸入譯者名字"
                    labelPlacement="outside"
                    label="譯者"
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
            <ZodInput
              zodSchema={ISBNSchema}
              value={bookISBN}
              onValueChange={setBookISBN}
              isRequired
              labelPlacement="outside"
              placeholder="9789573229322"
              label="ISBN"
            />
            <MyInput
              labelPlacement="outside"
              placeholder="1996-12-16"
              label="出版日期（選填）"
            />
            <Divider />
          </div>
          <div className="mt-4">
            <div className="mb-1 flex items-end">
              <span className="mr-4">目錄大綱／習題編排（選填）</span>
              <ImportContents setBookContents={setBookContents} />
            </div>
            <span className="flex items-end text-xs text-gray-500">
              <FaCircleInfo className="mb-[2px] mr-1" />{" "}
              <div>書本的章節目錄，通常可以在賣書網站中找到</div>
            </span>
          </div>
          <ContentsTree
            bookContents={bookContents}
            setBookContents={setBookContents}
          />
          <Divider className="mb-4" />
          <div className="mb-8 flex justify-end">
            <Button color="primary">新增書籍</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
