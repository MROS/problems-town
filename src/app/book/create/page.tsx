"use client";
import {
  Button,
  Checkbox,
  Divider,
  Link,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { ArrayInput, ZodInput } from "~/app/_components/myInput";
import { ImportContents } from "./importContentsModal";
import { ContentsTree, SetMaterialNames, type TreeNode } from "./contentsTree";
import {
  type BookForm,
  writerSchema,
  ISBNSchema,
  bookNameSchema,
  dateSchema,
  pageNumberSchema,
} from "./zodSchema";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const BOOK_FORMS: { name: BookForm; disabled?: boolean }[] = [
  { name: "現代出版品" },
  { name: "電子書", disabled: true },
  { name: "古籍", disabled: true },
];

// TODO: 等到提交表單時再驗證 zod ，並解析 trcp 錯誤來設定 input 的錯誤訊息
export default function NewBook() {
  const router = useRouter();

  const [bookForm, setBookForm] = useState<BookForm>("現代出版品");
  const [bookName, setBookName] = useState("");
  const [bookAuthors, setBookAuthors] = useState([""]);
  const [isTranslated, setIsTranslated] = useState(false);
  const [bookTranslators, setBookTranslators] = useState<null | string[]>(null);
  const [originalName, setOriginalName] = useState<null | string>(null);
  const [bookISBN, setBookISBN] = useState("");
  const [bookPageNumber, setBookPageNumber] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [materialNames, setMaterialNames] = useState<string[]>(["習題"]);
  const [bookContents, setBookContents] = useState<TreeNode[]>([]);

  const [submitError, setSubmitError] = useState<JSX.Element>(<></>);

  const createBook = api.book.create.useMutation();

  const submit = async () => {
    const newBook = {
      date: publishedDate.length == 0 ? null : publishedDate,
      name: bookName,
      form: bookForm,
      authors: bookAuthors,
      translators: bookTranslators,
      originalName: originalName,
      pageNumber: bookPageNumber.length == 0 ? null : bookPageNumber,
      ISBN: bookISBN,
      materialNames: materialNames,
      TOCTree: bookContents,
    };
    console.log(JSON.stringify(newBook, null, 2));
    createBook.mutate(newBook, {
      onError: (opts) => {
        if (opts.data?.code == "CONFLICT") {
          const href = `${window.location.origin}/book/isbn/${bookISBN}`;
          setSubmitError(
            <div>
              <Link href={href}>{href}</Link>
            </div>,
          );
        } else {
          setSubmitError(<></>);
        }
      },
      onSuccess: (id) => {
        router.push(`/book/id/${id}`);
      },
    });
  };

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
              onChange={(e) => setBookForm(e.target.value as BookForm)}
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
              zodSchema={writerSchema}
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
                    setOriginalName(null);
                  } else {
                    setBookTranslators([""]);
                    setOriginalName("");
                  }
                }}
              >
                本書爲翻譯書籍？
              </Checkbox>
              {isTranslated && bookTranslators && originalName != null ? (
                <>
                  <div className="ml-6 mt-2 space-y-10">
                    <ZodInput
                      zodSchema={bookNameSchema}
                      value={originalName}
                      onValueChange={setOriginalName}
                      isRequired
                      labelPlacement="outside"
                      placeholder="請輸入原作名"
                      label="原作名"
                    />
                    <ArrayInput
                      zodSchema={writerSchema}
                      values={bookTranslators}
                      onValuesChange={setBookTranslators}
                      addText="新增另一位譯者"
                      isRequired
                      placeholder="請輸入譯者名字"
                      labelPlacement="outside"
                      label="譯者"
                    />
                  </div>
                </>
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
            <ZodInput
              zodSchema={dateSchema}
              value={publishedDate}
              onValueChange={setPublishedDate}
              labelPlacement="outside"
              placeholder="1996-12-16"
              label="出版日期（選填）"
            />
            <ZodInput
              zodSchema={pageNumberSchema}
              value={bookPageNumber}
              onValueChange={setBookPageNumber}
              labelPlacement="outside"
              placeholder="432"
              label="頁數（選填）"
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
          <SetMaterialNames
            materialNames={materialNames}
            setMaterialNames={setMaterialNames}
          />
          <ContentsTree
            materialNames={materialNames}
            bookContents={bookContents}
            setBookContents={setBookContents}
          />
          <Divider className="mb-4" />
          <div className="mb-8 text-small">
            <div className="flex justify-end">
              <Button color="primary" onPress={submit}>
                新增書籍
              </Button>
            </div>
            <div className="flex justify-end text-red-600">
              {createBook.error && (
                <p>請修正錯誤後再試一次！{createBook.error.message}</p>
              )}
            </div>
            <div className="flex justify-end text-red-600">{submitError}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
