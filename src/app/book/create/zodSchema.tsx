import { z } from "~/utils/chineseZod";

// 目錄樹 (react dnd treeview) 的 data 型別
export const NodeDataSchema = z.object({
  // 範例：chapterMaterial = {'計算題': 12, '證明題': 7}
  chapterMaterials: z.record(z.string(), z.number()),
});
export type NodeData = z.infer<typeof NodeDataSchema>;

const bookFormSchema = z.union([
  z.literal("現代出版品"),
  z.literal("電子書"),
  z.literal("古籍"),
]);

// export type BookForm = "現代出版品" | "電子書" | "古籍";
export type BookForm = z.infer<typeof bookFormSchema>;

export const bookNameSchema = z.string().min(1).max(256);
export const writerSchema = z.string().min(1).max(128);
export const ISBNSchema = z
  .string()
  .length(13)
  .regex(/^[0-9]{13}$/, "ISBN 由數字組成"); // TODO: 精確的 ISBN 正則表達式
export const dateSchema = z
  .string()
  .transform((value, context) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "錯誤的日期格式",
      });
    }
    return date;
  })
  .pipe(z.date().max(new Date(), "出版時間不可以比「現在」晚"));

export const pageNumberSchema = z
  .string()
  .transform((value, context) => {
    const n = parseInt(value);
    if (Number.isNaN(n)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "無法解析爲整數",
      });
    }
    return n;
  })
  .pipe(z.number().min(1, "至少要有 1 頁"));

const materialNamesSchema = z.string().min(1).array();

// TODTree = table of contents tree = 目錄樹
const TOCTreeNodeSchema = z.object({
  id: z.number().or(z.string()),
  parent: z.number().or(z.string()),
  text: z.string(),
  data: NodeDataSchema.optional(),
});

export type TOCTreeNode = z.infer<typeof TOCTreeNodeSchema>;

export const newBookSchema = z.object({
  name: bookNameSchema,
  form: bookFormSchema,
  authors: writerSchema.array(),
  translators: writerSchema.array().nullable(),
  originalName: bookNameSchema.nullable(),
  ISBN: ISBNSchema,
  pageNumber: pageNumberSchema.nullable(),
  date: dateSchema.nullable(),
  materialNames: materialNamesSchema,
  TOCTree: TOCTreeNodeSchema.array(),
});
