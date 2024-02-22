import { extendVariants, Input } from "@nextui-org/react";

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
