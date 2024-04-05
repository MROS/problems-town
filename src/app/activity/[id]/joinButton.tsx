"use client";
import { Button, Chip } from "@nextui-org/react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

type Props = {
  joined: boolean;
  activityId: number;
  readOnly?: boolean;
};

export default function JoinButton({ joined, activityId, readOnly }: Props) {
  const joinActivity = api.activity.join.useMutation();
  const router = useRouter();

  if (joined) {
    return <Chip color="secondary">參加中</Chip>;
  }
  if (readOnly) {
    return (
      <Chip variant="faded" color="secondary">
        未參加
      </Chip>
    );
  }

  return (
    <Button
      size="sm"
      variant="flat"
      color="secondary"
      onClick={() => {
        joinActivity.mutate(
          { id: activityId },
          {
            onError: (error) => {
              console.error(error);
            },
            onSuccess: () => {
              // TODO: 不要重整路由，但更新到成員數量
              router.refresh();
            },
          },
        );
      }}
    >
      參加
    </Button>
  );
}
