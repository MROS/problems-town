"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export default function SetNameModal() {
  const { status, data: session, update } = useSession();
  const updateName = api.user.updateName.useMutation();
  const router = useRouter();

  const [value, setValue] = useState("");
  if (status != "authenticated") {
    return <></>;
  }
  if (status == "authenticated" && session.user.name) {
    return <></>;
  }
  return (
    <Modal isOpen={true} hideCloseButton={true}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          您已成功註冊，請設定使用者名稱
        </ModalHeader>
        <ModalBody>
          <Input
            label="使用者名稱"
            placeholder="卍乂殺神墮天乂卍"
            classNames={{ input: ["placeholder:text-default-400"] }}
            value={value}
            onValueChange={setValue}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              updateName.mutate(
                { name: value },
                {
                  onSuccess: () => {
                    update()
                      .then(() => console.log("成功設定名稱"))
                      .catch((err) => console.log(err));
                    router.refresh();
                  },
                  onError: (err) => console.log(err),
                },
              );
            }}
          >
            確定
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
