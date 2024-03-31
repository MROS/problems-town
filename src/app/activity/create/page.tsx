"use client";
import { useState } from "react";
import { Divider, Select, SelectItem } from "@nextui-org/react";
import {
  activityNameSchema,
  activityDescriptionSchema,
  type ActivityStatus,
} from "./zodSchema";
import { ZodInput, ZodTextarea } from "~/app/_components/myInput";

const STATUS: { name: ActivityStatus; disabled?: boolean }[] = [
  { name: "尚未開始" },
  { name: "進行中" },
  { name: "取消", disabled: true },
  { name: "已結束", disabled: true },
];

export default function Activity() {
  const [activityName, setActivityName] = useState("");
  const [activityStatus, setActivityStatus] = useState("尚未開始");
  const [activityDescription, setActivityDescription] = useState("");
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
              label="狀態"
              placeholder="現代出版品"
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
                    {name}
                  </SelectItem>
                );
              })}
            </Select>
            <ZodTextarea
              zodSchema={activityDescriptionSchema}
              value={activityDescription}
              onValueChange={setActivityDescription}
              labelPlacement="outside"
              placeholder="請闡述活動的宗旨、目標、進行方式"
              label="活動內容（選填）"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
