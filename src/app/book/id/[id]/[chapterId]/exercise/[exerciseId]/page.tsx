import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { CheckValidChapterURL } from "~/app/book/id/[id]/[chapterId]/checkValidChapterURL";
import { type ChapterData } from "~/app/book/id/[id]/[chapterId]/chapterURL";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import getExerciseURL from "./exerciseURL";
import SubmitAnswer from "./submitAnswer";

type Params = { id: string; chapterId: string; exerciseId: string };

type Props = {
  params: Params;
};

type ExerrciseData = ChapterData & {
  exerciseId: number;
};

export async function CheckValidExerciseURL(
  params: Params,
): Promise<ExerrciseData> {
  const data = await CheckValidChapterURL(params);
  const { node } = data;
  const exerciseId = parseInt(params.exerciseId);
  if (
    Number.isNaN(exerciseId) ||
    exerciseId < 1 ||
    exerciseId > node.exerciseNumber
  ) {
    notFound();
  }
  return { ...data, exerciseId };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await CheckValidExerciseURL(params);
  const { node, exerciseId } = data;
  return {
    title: `${node.name} | 習題 ${exerciseId}`,
  };
}

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
        <Button as={Link} href={`${exerciseURL}/answer`} size="sm">
          查看解答
        </Button>
      </div>
      <div className="mt-6 space-y-4">
        <div>
          <h3 className="font-bold">題目敘述</h3>
          <div className="mt-2 text-gray-500">
            因版權受限，恕無法提供。請參閱書本。
          </div>
        </div>
        <div>
          <h3 className="font-bold">作答</h3>
          <div className="mt-2">
            <SubmitAnswer />
          </div>
        </div>
      </div>
    </div>
  );
}
