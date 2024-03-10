"use client";
import {
  Tree,
  getBackendOptions,
  MultiBackend,
  type NodeModel,
} from "@minoru/react-dnd-treeview";
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { DndProvider } from "react-dnd";
import { FaPen, FaAngleRight, FaAngleDown } from "react-icons/fa6";
import React, { useMemo, useState } from "react";
import { MyInput } from "~/app/_components/myInput";
import { type NodeData } from "./zodSchema";

export type TreeNode = NodeModel<NodeData>;

const INDENT_SIZE = 24;

type HandleNodeModify = (
  id: TreeNode["id"],
  text: string,
  data: NodeData,
) => void;

export function ContentsTree(props: {
  materialNames: string[];
  bookContents: TreeNode[];
  setBookContents: (treeNodes: TreeNode[]) => void;
}) {
  const handleDrop: (tree: TreeNode[]) => void = (newTreeData) =>
    props.setBookContents(newTreeData);

  const handleNodeModify: HandleNodeModify = (
    id: TreeNode["id"],
    text: string,
    data: NodeData,
  ) => {
    const newContents = props.bookContents.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          text,
          data,
        };
      }
      return node;
    });

    props.setBookContents(newContents);
  };

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        classes={{
          root: "py-6",
          dropTarget: "bg-blue-100",
          draggingSource: "opacity-30",
          placeholder: "relative",
        }}
        dropTargetOffset={10}
        tree={props.bookContents}
        rootId={0}
        onDrop={handleDrop}
        sort={false}
        canDrop={(_tree, { dragSource, dropTargetId }) => {
          if (dragSource?.parent === dropTargetId) {
            return true;
          }
        }}
        insertDroppableFirst={false}
        placeholderRender={(node, { depth }) => {
          return (
            <div
              className="absolute right-0 top-0 h-1 -translate-y-1/2 bg-blue-500"
              style={{ left: depth * INDENT_SIZE }}
            ></div>
          );
        }}
        render={(node, { depth, isOpen, hasChild, onToggle }) => (
          <CustomNode
            node={node}
            depth={depth}
            hasChild={hasChild}
            materialNames={props.materialNames}
            isOpen={isOpen}
            onToggle={onToggle}
            handleNodeModify={handleNodeModify}
          />
        )}
      />
    </DndProvider>
  );
}

function MaterialNameChips(props: { names: string[] }) {
  return (
    <div>
      {props.names.map((name) => (
        <Chip size="sm" key={name}>
          {name}
        </Chip>
      ))}
    </div>
  );
}

export function SetMaterialNames(props: {
  materialNames: string[];
  setMaterialNames: (materialNames: string[]) => void;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { materialNames, setMaterialNames } = props;
  const [text, setText] = useState(materialNames.join(","));

  React.useEffect(() => {
    setText(materialNames.join(","));
  }, [materialNames]);

  const parsedNames = text
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name.length != 0);

  return (
    <div className="flex flex-row pt-4 hover:cursor-pointer" onClick={onOpen}>
      本書內附
      <MaterialNameChips names={materialNames} />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                編輯內附材料類別
              </ModalHeader>
              <ModalBody>
                <MyInput
                  label="材料類別（用,區隔）"
                  value={text}
                  onValueChange={setText}
                  placeholder={"計算題,應用題,證明題"}
                />
                <MaterialNameChips names={parsedNames} />
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={() => {
                    setText(materialNames.join(","));
                    onClose();
                  }}
                >
                  取消
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    setMaterialNames(parsedNames);
                    onClose();
                  }}
                >
                  確定
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

type Props = {
  node: NodeModel<NodeData>;
  depth: number;
  isOpen: boolean;
  hasChild: boolean;
  materialNames: string[];
  onToggle: () => void;
  handleNodeModify: HandleNodeModify;
};

function createNewChapterMaterial(
  materialNames: string[],
  chapterMaterials: Record<string, number>,
): Record<string, string> {
  const newChapterMaterials: Record<string, string> = {};
  materialNames.forEach((name) => {
    const value = chapterMaterials[name];
    if (value == undefined) {
      newChapterMaterials[name] = "0";
    } else {
      newChapterMaterials[name] = value.toString();
    }
  });
  return newChapterMaterials;
}

function toNonNegativeInteger(count: string | undefined): number | null {
  if (count == undefined) {
    return null;
  }
  const n = parseInt(count);
  if (!Number.isInteger(n) || n < 0) {
    return null;
  }
  return n;
}

const CustomNode: React.FC<Props> = (props) => {
  // modal 狀態
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [text, setText] = useState(props.node.text);

  const chapterMaterials = useMemo(
    () =>
      createNewChapterMaterial(
        props.materialNames,
        props.node.data?.chapterMaterials ?? {},
      ),
    [props.materialNames, props.node.data?.chapterMaterials],
  );
  const [newChapterMaterials, setNewChapterMaterials] = useState<
    Record<string, string>
  >({});

  React.useEffect(() => {
    setNewChapterMaterials(chapterMaterials);
  }, [chapterMaterials]);

  return (
    <div
      className={`${
        props.hasChild ? "hover:cursor-pointer" : ""
      }  flex h-8 flex-row items-center hover:bg-gray-100`}
      style={{ paddingLeft: props.depth * INDENT_SIZE }}
    >
      <span className="flex flex-row items-center" onClick={props.onToggle}>
        {props.hasChild ? (
          <>
            {props.isOpen ? <FaAngleDown /> : <FaAngleRight />}
            <span>{props.node.text}</span>
          </>
        ) : (
          <span className="ml-[16px]">{props.node.text}</span>
        )}
        {props.materialNames.map((name) => {
          const count = chapterMaterials[name];
          if (count == undefined || parseInt(count) <= 0) {
            return null;
          }
          return (
            <Chip key={name} color="primary" className="ml-2" size="sm">
              {count} 道{name}
            </Chip>
          );
        })}
        <FaPen
          className="text-10 ml-2 opacity-50 hover:cursor-pointer hover:opacity-100"
          onClick={onOpen}
        />
      </span>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                更新章節資訊
              </ModalHeader>
              <ModalBody>
                <MyInput
                  label="章節名稱"
                  value={text}
                  onValueChange={setText}
                  placeholder={props.node.text}
                />
                {props.materialNames.map((name) => {
                  const count = newChapterMaterials[name];
                  const valid = toNonNegativeInteger(count) != null;
                  return (
                    <MyInput
                      key={name}
                      type="number"
                      label={`${name}數量`}
                      value={newChapterMaterials[name]}
                      onValueChange={(value) => {
                        setNewChapterMaterials({
                          ...newChapterMaterials,
                          [name]: value,
                        });
                      }}
                      isInvalid={!valid}
                      errorMessage={!valid ? "數量必須是非負整數" : ""}
                      placeholder={`${name}數量`}
                    />
                  );
                })}
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={() => {
                    setText(props.node.text);
                    setNewChapterMaterials({ ...chapterMaterials });
                    onClose();
                  }}
                >
                  取消
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    let ok = true;
                    const chapterMaterials: Record<string, number> = {};
                    for (const name of props.materialNames) {
                      const n = toNonNegativeInteger(newChapterMaterials[name]);
                      if (n == null) {
                        ok = false;
                        break;
                      }
                      chapterMaterials[name] = n;
                    }
                    if (!ok) {
                      return;
                    }
                    props.handleNodeModify(props.node.id, text, {
                      chapterMaterials,
                    });
                    onClose();
                  }}
                >
                  確定
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
