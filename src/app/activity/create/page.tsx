"use client";
import { useState } from "react";
import { Button, Divider, Select, SelectItem } from "@nextui-org/react";
import {
  activityNameSchema,
  activityDescriptionSchema,
  type ActivityStatus,
} from "./zodSchema";
import { ZodInput, ZodTextarea } from "~/app/_components/myInput";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { activityStatusToDisplayName } from "../translation";

const STATUS: { name: ActivityStatus; disabled?: boolean }[] = [
  { name: "NOT_START" },
  { name: "ACTIVE" },
  { name: "CANCEL", disabled: true },
  { name: "ENDED", disabled: true },
];

export default function NewActivity() {
  const router = useRouter();
  const [activityName, setActivityName] = useState("");
  const [activityStatus, setActivityStatus] =
    useState<ActivityStatus>("ACTIVE");
  const [activityDescription, setActivityDescription] = useState("");

  const createActivity = api.activity.create.useMutation();

  const submit = () => {
    const newActivity = {
      name: activityName,
      status: activityStatus,
      description: activityDescription,
    };
    createActivity.mutate(newActivity, {
      onError: (error) => {
        console.error(error);
      },
      onSuccess: (id) => {
        router.push(`/activity/${id}`);
      },
    });
    return;
  };

  return (
    <main className="flex grow flex-col">
      <div className="flex w-full flex-col items-center px-4 pt-10">
        <div className="flex w-full max-w-lg flex-col">
          <h1 className="text-lg font-bold">舉辦活動</h1>
          <Divider className="mb-4 mt-2" />
          <div className="space-y-10">
            <ZodInput
              zodSchema={activityNameSchema}
              value={activityName}
              onValueChange={setActivityName}
              isRequired
              labelPlacement="outside"
              placeholder="活動名稱"
              label="活動名稱"
            />
            <Select
              isRequired
              className="mb-4"
              label="進行狀態"
              labelPlacement="outside"
              selectedKeys={[activityStatus]}
              onChange={(e) =>
                setActivityStatus(e.target.value as ActivityStatus)
              }
              disabledKeys={STATUS.filter((status) => status.disabled).map(
                (status) => status.name,
              )}
            >
              {STATUS.map((status) => {
                const name = status.name;
                return (
                  <SelectItem key={name} value={name}>
                    {activityStatusToDisplayName(name)}
                  </SelectItem>
                );
              })}
            </Select>
            <ZodTextarea
              zodSchema={activityDescriptionSchema}
              value={activityDescription}
              onValueChange={setActivityDescription}
              minRows={12}
              maxRows={30}
              labelPlacement="outside"
              placeholder="請闡述活動的宗旨、目標、進行方式。支援 Markdown 格式。"
              label="活動內容（選填）"
            />
          </div>
          <Divider className="mb-4" />
          <div className="mb-8 text-small">
            <div className="flex justify-end">
              <Button color="primary" onPress={submit}>
                舉辦活動
              </Button>
            </div>
            <div className="flex justify-end text-red-600">
              {createActivity.error && (
                <p>請修正錯誤後再試一次！{createActivity.error.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
