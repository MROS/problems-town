"use client";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function NewActivityButton() {
  const router = useRouter();
  return (
    <Button
      size="sm"
      variant="solid"
      color="primary"
      startContent={<FaPlus />}
      onClick={() => router.push("/activity/create")}
    >
      新增
    </Button>
  );
}
