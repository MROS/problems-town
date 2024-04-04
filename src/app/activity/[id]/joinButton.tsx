"use client";
import { Button, Chip } from "@nextui-org/react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

type Props = {
  joined: boolean;
  activityId: number;
};

export default function JoinButton({ joined, activityId }: Props) {
  const joinActivity = api.activity.join.useMutation();
  const router = useRouter();

  if (joined) {
    return <Chip>參加中</Chip>;
  }
  return (
    <Button
      size="sm"
      color="primary"
      onClick={() => {
        joinActivity.mutate(
          { id: activityId },
          {
            onError: (error) => {
              console.error(error);
            },
            onSuccess: () => {
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
