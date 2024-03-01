import { Button } from "@nextui-org/react";
import { CheckValidExerciseURL } from "../page";
import getExerciseURL from "../exerciseURL";
import Link from "next/link";

type Params = { id: string; chapterId: string; exerciseId: string };

type Props = {
  params: Params;
};

export default async function Exercise({ params }: Props) {
  const data = await CheckValidExerciseURL(params);
  const { node } = data;
  const exerciseURL = getExerciseURL(node.bookId, node.id, params.exerciseId);

  return (
    <div className="mt-2">
      <div className="flex flex-row justify-between">
        <h2 className="text-lg font-bold">
          <Link color="foreground" href={exerciseURL}>
            習題 {data.exerciseId}
          </Link>
        </h2>
        {/* TODO: 顯示解答數量 */}
        <Button as={Link} href="./" size="sm">
          返回題目
        </Button>
      </div>
      <div className="mt-6 space-y-4">解答</div>
    </div>
  );
}
