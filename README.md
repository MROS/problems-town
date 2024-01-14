# 做題小鎮

## 建置

```
# 初次設定
pnpm i                  # 安裝依賴
cp .env.example .env    # 創建並設定環境變數檔案 .env ，請視需要自行修改
pnpm db:push            # 設定資料庫 schema

# 啓動開發用伺服器
pnpm dev
```

## 技術棧
採用 [T3 Stack](https://create.t3.gg/) 模板，使用以下框架／函式庫／工具：

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
