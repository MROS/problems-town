import {
  Tree,
  getBackendOptions,
  MultiBackend,
  type NodeModel,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";

export type NodeData = {
  exerciseNumber?: number;
};

export type TreeNode = NodeModel<NodeData>;
export function ContentsTree(props: {
  bookContents: TreeNode[];
  setBookContents: (treeNodes: TreeNode[]) => void;
}) {
  const handleDrop: (tree: TreeNode[]) => void = (newTreeData) =>
    props.setBookContents(newTreeData);

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={props.bookContents}
        rootId={0}
        onDrop={handleDrop}
        sort={false}
        initialOpen={true}
        render={(node, { depth, isOpen, hasChild, onToggle }) => (
          <div style={{ marginLeft: depth * 24 }}>
            {hasChild ? (
              <span className="flex flex-row items-center" onClick={onToggle}>
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
  );
}
