import { Button, Image, Spinner } from "@nextui-org/react";
import assert from "assert";
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

// 上傳影像到 iamgeBB ，回傳 URL 陣列
async function uploadToImagesBB(
  apiKey: string,
  files: HTMLInputElement["files"],
  progressCallback: (index: number) => void,
): Promise<string[]> {
  if (files == undefined) {
    return [];
  }
  const imageURLs = [];
  for (let i = 0; i < files?.length; i++) {
    progressCallback(i + 1);
    const file = files.item(i);
    assert(file != null, "file 索引在 FileList 長度內不可能爲空");

    const imageBase64 = await getBase64(file);
    const formData = new FormData();
    formData.append("image", imageBase64.split(",")[1]!); // 刪掉 imageBase64 前置的 data:image/png;base64,
    const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response: ImgbbResponse = await fetch(url, {
      method: "post",
      body: formData,
    }).then((res) => res.json());
    imageURLs.push(response.data.display_url);
  }
  return imageURLs;
}

function PreviewFiles(props: { files: HTMLInputElement["files"] }) {
  const { files } = props;
  if (files == undefined) {
    return <></>;
  }
  const images = [];
  for (let i = 0; i < files.length; i++) {
    const file = files.item(i);
    assert(file != null, "file 索引在 FileList 長度內不可能爲空");

    images.push(
      <Image
        src={URL.createObjectURL(file)}
        alt={`${file.name}圖片預覽`}
      ></Image>,
    );
  }
  return <div>{images}</div>;
}

export default function ImageUrlAnswerForm(props: {
  exerciseId: string;
  apiKey: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const fileInput = useRef(null);
  const [files, setFiles] = useState<HTMLInputElement["files"]>(null);
  const [uploadingIndex, setUploadingIndex] = useState(-1); // -1 代表沒有在上傳東西
  const [error, setError] = useState<null | Error>(null);
  const createAnswer = api.answer.create.useMutation();
  return (
    <div>
      <div className="flex flex-row justify-between">
        <input
          ref={fileInput}
          type="file"
          multiple
          name="image"
          accept="image/*"
          onChange={(event) => {
            setFiles(event.target.files);
          }}
        />
        {files && files.length > 0 && (
          <Button
            color="primary"
            onPress={async () => {
              setUploadingIndex(0);
              try {
                const imageUrls = await uploadToImagesBB(
                  props.apiKey,
                  files,
                  setUploadingIndex,
                );
                createAnswer.mutate(
                  {
                    exerciseId: props.exerciseId,
                    text: imageUrls.join("\n"),
                    format: "IMAGE_URL",
                  },
                  {
                    onSuccess: () => {
                      router.push(`${pathname}/answer`);
                      router.refresh();
                    },
                  },
                );

                setUploadingIndex(-1);
              } catch (error) {
                console.error(error);
                if (error instanceof Error) {
                  setError(error);
                } else {
                  setError(new Error("未知錯誤，請查看主控臺"));
                }
                setUploadingIndex(-1);
              }
            }}
          >
            上傳並繳交
          </Button>
        )}
      </div>
      {uploadingIndex >= 0 && (
        <div className="flex flex-row">
          <Spinner className="mr-2" />
          {`${uploadingIndex} / ${files?.length} 上傳中...`}
        </div>
      )}
      {error && <div>error.toString()</div>}
      <PreviewFiles files={files} />
      <div className="mt-2 text-gray-500">僅支援 32 MB 以下圖片</div>
    </div>
  );
}
