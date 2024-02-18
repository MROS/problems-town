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
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

enum ERROR_MESSAGE {
  UNKNOWN_ERROR = "未知錯誤",
  TOO_SHORT = "至少要一個字吧",
}

export default function SetNameModal() {
  const { status, data: session, update } = useSession();
  const updateName = api.user.updateName.useMutation();
  const router = useRouter();

  const [name, setName] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | ERROR_MESSAGE>(null);

  useEffect(() => {
    if (invalid && name.length > 0) {
      setInvalid(false);
      setErrorMessage(null);
    }
  }, [invalid, name.length]);

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
          您已成功註冊，請設定基本資料
        </ModalHeader>
        <ModalBody>
          <Input
            label="暱稱"
            placeholder="卍乂殺神墮天乂卍"
            classNames={{ input: ["placeholder:text-default-400"] }}
            value={name}
            onValueChange={setName}
            isInvalid={invalid}
            errorMessage={errorMessage}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              if (name.length == 0) {
                setInvalid(true);
                setErrorMessage(ERROR_MESSAGE.TOO_SHORT);
                return;
              }

              updateName.mutate(
                { name: name },
                {
                  onSuccess: () => {
                    update().catch((err) => console.log(err));
                    router.refresh();
                  },
                  onError: (err) => {
                    setErrorMessage(ERROR_MESSAGE.UNKNOWN_ERROR);
                    console.error(err);
                  },
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
