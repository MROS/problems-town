"use client";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function NewBookButton() {
  const router = useRouter();
  return (
    <Button
      size="sm"
      variant="solid"
      color="primary"
      startContent={<FaPlus />}
      onClick={() => router.push("/book/create")}
    >
      新增
    </Button>
  );
}
