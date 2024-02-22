"use client";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { MyInput } from "~/app/_components/myInput";

const BOOK_FORMS = [
  { name: "現代出版品" },
  { name: "電子書", disabled: true },
  { name: "古籍", disabled: true },
];

export default function NewBook() {
  const [bookForm, setBookForm] = useState("現代出版品");

  return (
    <main className="flex grow flex-col ">
      <div className="flex w-screen flex-col items-center pt-10">
        <div className="flex w-full max-w-lg flex-col">
          <h1 className="text-lg font-bold">新增書籍</h1>
          <Divider className="mb-4 mt-2" />
          <div className="space-y-10">
            <MyInput
              isRequired
              labelPlacement="outside"
              placeholder="連城訣"
              label="書名"
            />
            <MyInput
              isRequired
              labelPlacement="outside"
              placeholder="金庸"
              label="作者"
            />
            <Select
              isRequired
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
              placeholder="1996/12/16"
              label="出版日期"
            />
            <MyInput
              isRequired
              labelPlacement="outside"
              placeholder="9789573229322"
              label="ISBN"
            />
            <Divider className="mb-4 mt-2" />
            <div>
              <div className="flex items-end">
                <span className="mr-4">目錄大綱／習題編排（選填）</span>
                <ImportContents />
              </div>
              <span className="text-xs text-gray-500">
                書本的章節目錄，通常可以在賣書網站中找到
              </span>
            </div>
            <Divider className="mb-4 mt-2" />
            <div className="flex justify-end">
              <Button color="primary">新增書籍</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const CONTENTS_EXAMPLE = {
  "第一章 鄉下人進城": {},
  "第二章 牢獄": {},
  "第三章 人淡如菊": {},
  "第四章 空心菜": {},
  "第五章 老鼠湯": {},
  "第六章 血刀老祖": {},
  "第七章 落花流水": {},
  "第八章 羽衣": {},
  "第九章 「梁山伯•祝英台」": {},
  "第十章 「唐詩選輯」": {},
  "第十一章 砌牆": {},
  "第十二章 大寶藏": {},
};

function ImportContents() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <span>
      <Button size="sm" onPress={onOpen}>
        JSON 導入
      </Button>

      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                以 JSON 格式導入目錄
              </ModalHeader>
              <ModalBody>
                <Textarea
                  minRows={14}
                  maxRows={20}
                  placeholder={JSON.stringify(CONTENTS_EXAMPLE, null, 2)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  導入
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </span>
  );
}
