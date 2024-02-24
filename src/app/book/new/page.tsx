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
import { MyInput } from "~/app/_components/myInput";
import { ImportContents } from "./importContentsModal";
import { ContentsTree, type TreeNode } from "./contentsTree";

const BOOK_FORMS = [
  { name: "現代出版品" },
  { name: "電子書", disabled: true },
  { name: "古籍", disabled: true },
];

export default function NewBook() {
  const [bookForm, setBookForm] = useState("現代出版品");
  const [isTranslated, setIsTranslated] = useState(false);
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
            <MyInput
              isRequired
              labelPlacement="outside"
              placeholder="連城訣"
              label="書名"
            />
            {/* TODO: 支援複數名作者 */}
            <MyInput
              isRequired
              labelPlacement="outside"
              placeholder="金庸"
              label="作者"
            />
            <div className="!mt-4">
              <Checkbox
                size="sm"
                isSelected={isTranslated}
                onValueChange={setIsTranslated}
              >
                本書爲翻譯書籍？
              </Checkbox>
              {/* TODO: 支援複數名譯者 */}
              {isTranslated ? (
                <MyInput
                  className="ml-6"
                  isRequired
                  labelPlacement="outside-left"
                  label="譯者"
                />
              ) : (
                <></>
              )}
            </div>
            <MyInput
              isRequired
              labelPlacement="outside"
              placeholder="1996-12-16"
              label="出版日期"
            />
            <MyInput
              isRequired
              labelPlacement="outside"
              placeholder="9789573229322"
              label="ISBN"
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
