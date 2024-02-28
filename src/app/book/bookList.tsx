"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { lightFormat } from "date-fns";
import { type Book } from "@prisma/client";

export default function BookList(props: { bookList: Book[] }) {
  return (
    <Table removeWrapper>
      <TableHeader>
        <TableColumn>書名</TableColumn>
        <TableColumn>出版時間</TableColumn>
        <TableColumn>作者</TableColumn>
      </TableHeader>
      <TableBody emptyContent="尚無書籍">
        {props.bookList.map((book) => (
          <TableRow
            className="hover:cursor-pointer hover:bg-slate-100"
            href={`/book/id/${book.id}`}
            key={book.id}
          >
            <TableCell>{book.name}</TableCell>
            <TableCell>
              {book.publishDate
                ? lightFormat(book.publishDate, "yyyy-MM-dd")
                : ""}
            </TableCell>
            <TableCell>{book.authors.join("/")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
