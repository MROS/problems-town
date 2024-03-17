import { Button, Image, Spinner } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { api } from "~/trpc/react";

type ImgbbResponse = {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string; // 原檔網址
    display_url: string; // 壓縮過的圖片網址
    width: number;
    height: number;
    size: number;
    time: number;
    expiration: number;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    thumb: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    medium: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    delete_url: string;
  };
  success: boolean;
  status: number;
};

function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string); // 因爲使用 readAsDataURL ， result 爲 string
    reader.onerror = (error) => reject(error);
  });
}

export default function ImageUrlAnswerForm(props: {
  exerciseId: string;
  apiKey: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const fileInput = useRef(null);
  const [files, setFiles] = useState<HTMLInputElement["files"]>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const createAnswer = api.answer.create.useMutation();
  const file = files?.item(0);
  return (
    <div>
      <div className="flex flex-row justify-between">
        <input
          ref={fileInput}
          type="file"
          name="image"
          accept="image/*"
          onChange={(event) => {
            setFiles(event.target.files);
          }}
        />
        {file && (
          <Button
            color="primary"
            onPress={async () => {
              setUploading(true);
              const imageBase64 = await getBase64(file);
              const formData = new FormData();
              formData.append("image", imageBase64.split(",")[1]!); // 刪掉 imageBase64 前置的 data:image/png;base64,
              const url = `https://api.imgbb.com/1/upload?key=${props.apiKey}`;
              try {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const response: ImgbbResponse = await fetch(url, {
                  method: "post",
                  body: formData,
                }).then((res) => res.json());
                console.log(response.data.display_url);

                createAnswer.mutate(
                  {
                    exerciseId: props.exerciseId,
                    text: response.data.display_url,
                    format: "IMAGE_URL",
                  },
                  {
                    onSuccess: () => {
                      router.push(`${pathname}/answer`);
                      router.refresh();
                    },
                  },
                );

                setUploading(false);
              } catch (error) {
                console.error(error);
                if (error instanceof Error) {
                  setError(error);
                } else {
                  setError(new Error("未知錯誤，請查看主控臺"));
                }
                setUploading(false);
              }
            }}
          >
            上傳並繳交
          </Button>
        )}
      </div>
      {uploading && (
        <div className="flex flex-row">
          <Spinner /> 上傳中...
        </div>
      )}
      {error && <div>error.toString()</div>}
      {file && <Image src={URL.createObjectURL(file)} alt="圖片預覽" />}
      <div className="mt-2 text-gray-500">僅支援 32 MB 以下圖片</div>
    </div>
  );
}
