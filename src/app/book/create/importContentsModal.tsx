import { z } from "~/utils/chineseZod";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { type TreeNode } from "./contentsTree";

const baseComplexNodeSchema = z.object({
  name: z.string(),
});

export type ComplexNode = z.infer<typeof baseComplexNodeSchema> & {
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

// 將自定義的 JSON 目錄轉換成 React DnD TreeView 函式庫的資料型別
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

export function ImportContents(props: {
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
          {(_onClose) => (
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
