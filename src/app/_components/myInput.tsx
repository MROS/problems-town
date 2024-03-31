import { Button, extendVariants, Input, Textarea } from "@nextui-org/react";
import React from "react";
import { MdDelete } from "react-icons/md";
import { type z } from "zod";

export const MyInput = extendVariants(Input, {
  variants: {
    color: {
      lightPlaceholder: {
        input: ["placeholder:text-default-400"],
      },
    },
  },
  defaultVariants: {
    color: "lightPlaceholder",
  },
});

type MyInputProps = React.ComponentProps<typeof MyInput>;
type TextareaProps = React.ComponentProps<typeof Textarea>;

type AdditionalProps = {
  zodSchema: z.ZodType;
};

export const ZodTextarea = function ({
  zodSchema,
  ...props
}: TextareaProps & AdditionalProps) {
  // 在選填欄位輸入空字串，合法。
  if (!props.isRequired && props.value?.length == 0) {
    return <Textarea {...props} isInvalid={false} errorMessage={undefined} />;
  }

  const result = zodSchema.safeParse(props.value);
  if (!result.success) {
    const firstError = result.error.format()._errors[0];
    return <Textarea {...props} isInvalid={true} errorMessage={firstError} />;
  }
  return <Textarea {...props} isInvalid={false} errorMessage={undefined} />;
};

export const ZodInput = function ({
  zodSchema,
  ...props
}: MyInputProps & AdditionalProps) {
  // 在選填欄位輸入空字串，合法。
  if (!props.isRequired && props.value?.length == 0) {
    return <MyInput {...props} isInvalid={false} errorMessage={undefined} />;
  }

  const result = zodSchema.safeParse(props.value);
  if (!result.success) {
    const firstError = result.error.format()._errors[0];
    return <MyInput {...props} isInvalid={true} errorMessage={firstError} />;
  }
  return <MyInput {...props} isInvalid={false} errorMessage={undefined} />;
};

const OptionalZodInput = function ({
  zodSchema,
  ...props
}: MyInputProps & { zodSchema?: z.ZodType }) {
  if (zodSchema) {
    return <ZodInput zodSchema={zodSchema} {...props} />;
  }
  return <MyInput {...props} />;
};

// TODO: 僅有一個 input 時不要顯示刪除按鈕
export const ArrayInput = function ({
  addText,
  zodSchema,
  values,
  onValuesChange,
  ...props
}: {
  addText?: string;
  values: string[];
  onValuesChange: (values: string[]) => void;
  zodSchema?: z.ZodType;
} & MyInputProps) {
  return (
    <div>
      {values.map((value, index) => {
        return (
          <div key={index} className="flex flex-row">
            <OptionalZodInput
              value={value}
              zodSchema={zodSchema}
              onValueChange={(newValue) => {
                const newValues = values.map((v, i) => {
                  if (i == index) {
                    return newValue;
                  }
                  return v;
                });
                onValuesChange(newValues);
              }}
              {...props}
              label={index == 0 ? props.label : null}
            />
            <Button
              variant="bordered"
              isIconOnly
              className={index == 0 ? "self-end" : ""}
              onPress={() => {
                onValuesChange([
                  ...values.slice(0, index),
                  ...values.slice(index + 1),
                ]);
              }}
            >
              <MdDelete />
            </Button>
          </div>
        );
      })}
      <div className="mt-2 flex justify-end">
        <Button size="sm" onClick={() => onValuesChange([...values, ""])}>
          {addText ?? "新增"}
        </Button>
      </div>
    </div>
  );
};
