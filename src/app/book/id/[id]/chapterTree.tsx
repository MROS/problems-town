"use client";
import { Chip, Link } from "@nextui-org/react";
import { type ChapterNode } from "./queryBook";
import { useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import getChapterURL from "./[chapterId]/chapterURL";

export function ChapterTreeChildren(props: { childrenNodes: ChapterNode[] }) {
  const children = props.childrenNodes;
  return (
    <>
      {children.map((node) => (
        <ChapterTree key={node.id} root={node} />
      ))}
    </>
  );
}

function ChapterLine(props: {
  node: ChapterNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const node = props.node;
  const hasChild = node.children.length > 0;
  return (
    <div
      className={`flex flex-row items-center ${
        hasChild ? "hover:cursor-pointer" : ""
      } hover:bg-slate-100`}
      onClick={() => props.setIsOpen(!props.isOpen)}
    >
      {hasChild ? (
        props.isOpen ? (
          <FaAngleDown />
        ) : (
          <FaAngleRight />
        )
      ) : (
        <span className="w-[16px]"></span>
      )}
      <Link
        color="foreground"
        underline="hover"
        className="hover:cursor-pointer"
        href={getChapterURL(node.bookId, node.id)}
      >
        {node.name}
      </Link>
      {node.exerciseNumber > 0 && (
        <Chip color="primary" className="ml-2" size="sm">
          {node.exerciseNumber} 道習題
        </Chip>
      )}
    </div>
  );
}

export function ChapterTree(props: { root: ChapterNode }) {
  const root = props.root;
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <ChapterLine node={root} isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <div className="ml-2 border-l-1 pl-5">
          <ChapterTreeChildren childrenNodes={root.children} />
        </div>
      )}
    </div>
  );
}
