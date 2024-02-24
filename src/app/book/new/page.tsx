"use client";
import { z } from "~/utils/chineseZod";
import {
  Button,
  Checkbox,
  Divider,
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
import { type Dispatch, type SetStateAction, useState } from "react";
import { FaCircleInfo, FaAngleRight, FaAngleDown } from "react-icons/fa6";
import { MyInput } from "~/app/_components/myInput";
import {
  Tree,
  getBackendOptions,
  MultiBackend,
  type NodeModel,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";

const BOOK_FORMS = [
  { name: "現代出版品" },
  { name: "電子書", disabled: true },
  { name: "古籍", disabled: true },
];

type NodeData = {
  exerciseNumber?: number;
};

type TreeNode = NodeModel<NodeData>;

export default function NewBook() {
  const [bookForm, setBookForm] = useState("現代出版品");
  const [isTranslated, setIsTranslated] = useState(false);
  const [bookContents, setBookContents] = useState<TreeNode[]>([]);

  const handleDrop: (tree: TreeNode[]) => void = (newTreeData) =>
    setBookContents(newTreeData);

  return (
    <main className="flex grow flex-col">
      <div className="flex w-screen flex-col items-center px-4 pt-10">
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
              placeholder="1996/12/16 或 1996/12 或 1996"
              label="出版日期"
            />
            <MyInput
              isRequired
              labelPlacement="outside"
              placeholder="9789573229322"
              label="ISBN"
            />
            <Divider />
            <div>
              <div className="mb-1 flex items-end">
                <span className="mr-4">目錄大綱／習題編排（選填）</span>
                <ImportContents setBookContents={setBookContents} />
              </div>
              <span className="flex items-end text-xs text-gray-500">
                <FaCircleInfo className="mb-[2px] mr-1" />{" "}
                <div>書本的章節目錄，通常可以在賣書網站中找到</div>
              </span>
            </div>
            <DndProvider backend={MultiBackend} options={getBackendOptions()}>
              <Tree
                tree={bookContents}
                rootId={0}
                onDrop={handleDrop}
                sort={false}
                initialOpen={true}
                render={(node, { depth, isOpen, hasChild, onToggle }) => (
                  <div style={{ marginLeft: depth * 24 }}>
                    {hasChild ? (
                      <span
                        className="flex flex-row items-center"
                        onClick={onToggle}
                      >
                        {isOpen ? <FaAngleDown /> : <FaAngleRight />}
                        <span>{node.text}</span>
                      </span>
                    ) : (
                      <span className="ml-[16px]">{node.text}</span>
                    )}
                  </div>
                )}
              />
            </DndProvider>
            <Divider />
            <div className="flex justify-end">
              <Button color="primary">新增書籍</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const baseComplexNodeSchema = z.object({
  name: z.string(),
});

type ComplexNode = z.infer<typeof baseComplexNodeSchema> & {
  children: Node[];
};

const complexNodeSchema: z.ZodType<ComplexNode> = baseComplexNodeSchema.extend({
  children: z.lazy(() => nodeSchame.array()),
});

// 章節型別可以是以下兩種形式
// 1. 字串，表示章節名稱。此章節無任何子章節。
// 2. 物件，以表示子章節。
const nodeSchame = z.union([z.string(), complexNodeSchema]);

// type Node = string | { name:string, children: Node[] }
type Node = z.infer<typeof nodeSchame>;

const contentsSchema = z.array(nodeSchame);

// type Contents = Node[]
type Contents = z.infer<typeof contentsSchema>;

const example: Contents = [
  "譯者序",
  "前言",
  "給學生的註釋",
  "關於作者",
  {
    name: "第1章 線性代數中的線性方程組",
    children: [
      "介紹性實例：經濟學與工程中的線性模型",
      "1.1 線性方程組",
      "1.2 行化簡與階梯形矩陣",
      "1.3 向量方程",
      "1.4 矩陣方程Ax=b",
      "1.5 線性方程組的解集",
      "1.6 線性方程組的應用",
      "1.7 向量的線性相關性",
      "1.8 線性變換簡介",
      "1.9 線性變換的矩陣",
      "1.10 商業、科學和工程中的線性模型",
      "課題研究",
      "補充習題",
    ],
  },
];
const parsedExample = contentsSchema.parse(example);

const CONTENTS_EXAMPLE: Contents = [
  "第一章 鄉下人進城",
  "第二章 牢獄",
  "第三章 人淡如菊",
  "第四章 空心菜",
  "第五章 老鼠湯",
  "第六章 血刀老祖",
  "第七章 落花流水",
  "第八章 羽衣",
  "第九章 「梁山伯•祝英台」",
  "第十章 「唐詩選輯」",
  "第十一章 砌牆",
  "第十二章 大寶藏",
];

// 將此處自定義的 JSON 目錄轉換成 React DnD TreeView 函式庫的資料型別
class TreeViewTransformer {
  private contents: Contents;
  private currentIndex: number;

  constructor(contents: Contents) {
    this.contents = contents;
    this.currentIndex = 0;
  }

  transform(): TreeNode[] {
    const result: TreeNode[] = [];
    this.contents.forEach((node) => {
      this.transformNode(result, node, 0);
    });
    console.log(JSON.stringify(result, null, 2));
    return result;
  }

  private getIndex(): number {
    this.currentIndex += 1;
    return this.currentIndex;
  }

  private transformNode(result: TreeNode[], node: Node, parent: number) {
    if (typeof node == "string") {
      result.push({
        id: this.getIndex(),
        parent,
        droppable: true,
        text: node,
      });
    } else {
      const id = this.getIndex();
      // 前序遍歷，先推己，再推子
      result.push({
        id,
        parent,
        droppable: true,
        text: node.name,
      });
      node.children.forEach((child) => {
        this.transformNode(result, child, id);
      });
    }
  }
}

function ImportContents(props: {
  setBookContents: (value: TreeNode[]) => void;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [plainContents, setPlainContents] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const importContents = () => {
    let json: unknown;
    try {
      json = JSON.parse(plainContents);
    } catch (error) {
      setIsInvalid(true);
      setErrorMessage("解析 JSON 失敗，請輸入合法 JSON");
      console.error(error);
      return;
    }
    const parseResult = contentsSchema.safeParse(json);
    if (!parseResult.success) {
      setIsInvalid(true);
      let message = parseResult.error.toString();
      message =
        message.length <= 1000
          ? message
          : `${message.substring(0, 1000)}......`;
      setErrorMessage(message);
      return;
    }
    const transformer = new TreeViewTransformer(parseResult.data);
    props.setBookContents(transformer.transform());
    onClose();
  };

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
                  value={plainContents}
                  isInvalid={isInvalid}
                  errorMessage={errorMessage}
                  onValueChange={(value) => {
                    setIsInvalid(false);
                    setErrorMessage("");
                    setPlainContents(value);
                  }}
                  minRows={14}
                  maxRows={20}
                  placeholder={JSON.stringify(CONTENTS_EXAMPLE, null, 2)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={importContents}>
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
