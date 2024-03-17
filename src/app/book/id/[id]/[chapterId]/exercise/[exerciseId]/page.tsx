import { type Metadata } from "next";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import getExerciseURL from "./exerciseURL";
import AuthenticatedAnswerForm from "./createAnswer";
import { type Exercise } from "@prisma/client";
import { getExerciseData } from "./exerciseData";

type Params = {
  id: string;
  chapterId: string;
  exerciseId: string;
};

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getExerciseData(
    params.id,
    params.chapterId,
    params.exerciseId,
  );
  const { node, exercise } = data;
  return {
    title: `${node.name} | ${exercise.name}`,
  };
}

export default async function Exercise({ params }: Props) {
  const data = await getExerciseData(
    params.id,
    params.chapterId,
    params.exerciseId,
  );
  const { node, exercise } = data;
  const exerciseURL = getExerciseURL(node.bookId, node.id, params.exerciseId);

  return (
    <div className="mt-2">
      <div className="flex flex-row justify-between">
        <h2 className="text-lg font-bold">
          <Link color="foreground" href={exerciseURL}>
            {exercise.name}
          </Link>
        </h2>
        {/* TODO: 顯示解答數量 */}
        <Button
          variant="bordered"
          color="secondary"
          isDisabled={exercise._count.answers == 0}
          as={Link}
          href={`${exerciseURL}/answer`}
          size="sm"
        >
          他人解答 ({exercise._count.answers})
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
          <div className="mt-4">
            <AuthenticatedAnswerForm exerciseId={exercise.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
