"use client";
import { Button, Divider } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function Book() {
  const router = useRouter();
  return (
    <main className="flex grow flex-col ">
      <div className="flex w-screen flex-col items-center pt-10">
        <div className="flex w-full max-w-lg flex-col">
          <div className="flex flex-row items-end justify-between px-2">
            <div className="font-bold">藏書</div>
            <div className="">
              <Button
                size="sm"
                variant="solid"
                color="primary"
                startContent={<FaPlus />}
                onClick={() => router.push("/book/create")}
              >
                新增
              </Button>
            </div>
          </div>
          <Divider className="my-1" />
        </div>
      </div>
    </main>
  );
}
