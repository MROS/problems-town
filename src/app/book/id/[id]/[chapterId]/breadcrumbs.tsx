"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { type ChapterNode } from "../queryBook";
import getChapterURL from "./chapterURL";
import Link from "next/link";
import { FaBookOpen } from "react-icons/fa6";
import getBookURL from "../bookURL";

export function PathToRoot(props: {
  node: ChapterNode;
  nodes: Map<string, ChapterNode>;
}) {
  const { node } = props;
  let current: ChapterNode | null = node;
  const path = [];

  while (current) {
    path.push(current);
    current = current.parent;
  }
  path.reverse();

  return (
    <Breadcrumbs>
      <BreadcrumbItem>
        <Link className="hover:underline" href={getBookURL(node.bookId)}>
          <FaBookOpen />
        </Link>
      </BreadcrumbItem>
      {path.slice(1).map((node) => {
        return (
          <BreadcrumbItem key={node.id}>
            <Link
              className="hover:underline"
              href={getChapterURL(node.bookId, node.id)}
            >
              {node.name}
            </Link>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
}
