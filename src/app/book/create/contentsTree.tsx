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
import React, { useState } from "react";
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
          root: "py-10",
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
            isOpen={isOpen}
            onToggle={onToggle}
            handleNodeModify={handleNodeModify}
          />
        )}
      />
    </DndProvider>
  );
}

type Props = {
  node: NodeModel<NodeData>;
  depth: number;
  isOpen: boolean;
  hasChild: boolean;
  onToggle: () => void;
  handleNodeModify: HandleNodeModify;
};

const CustomNode: React.FC<Props> = (props) => {
  // modal 狀態
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [text, setText] = useState(props.node.text);
  const initialExerciseNumber =
    props.node.data?.exerciseNumber.toString() ?? "0";
  const [exerciseNumber, setExerciseNumber] = useState(initialExerciseNumber);
  const [invalidNumber, setInvalidNumber] = useState(false);

  React.useEffect(() => {
    setExerciseNumber(initialExerciseNumber);
  }, [initialExerciseNumber]);

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
        {parseInt(initialExerciseNumber) > 0 && (
          <Chip className="ml-2" size="sm">
            {initialExerciseNumber} 道習題
          </Chip>
        )}
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
                <MyInput
                  type="number"
                  label="習題數量"
                  value={exerciseNumber}
                  onValueChange={(value) => {
                    setInvalidNumber(false);
                    setExerciseNumber(value);
                  }}
                  isInvalid={invalidNumber}
                  errorMessage={invalidNumber ? "習題數量必須是是正整數" : ""}
                  placeholder={initialExerciseNumber}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={() => {
                    setText(props.node.text);
                    setExerciseNumber(initialExerciseNumber);
                    setInvalidNumber(false);
                    onClose();
                  }}
                >
                  取消
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    const n = parseInt(exerciseNumber);
                    if (!Number.isInteger(n) || n < 0) {
                      setInvalidNumber(true);
                      return;
                    }
                    setInvalidNumber(false);
                    props.handleNodeModify(props.node.id, text, {
                      exerciseNumber: n,
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
