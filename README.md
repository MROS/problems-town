# 做題小鎮

制定讀書會計劃，互相勾選、批改習題，舉辦期中期末測驗。

## 建置

### 安裝依賴

- [Node.js](https://nodejs.org/en/download) (v20 以上)
    - 建議使用 [nvm](https://nodejs.org/en/download/package-manager#nvm) 安裝
- [pnpm](https://pnpm.io/installation)

### 下載源碼
``` sh
git@github.com:problems-town/problems-town.git
cd problems-town
```

### 設定環境變數

``` sh
cp .env.example .env
vim .env                    # 依範例檔案中的註解設定環境變數
```

### 啓動
``` sh
pnpm i                      # 安裝 npm 套件
pnpm db:push                # 灌入資料庫 schema
pnpm dev                    # 以開發模式啓動（即時編譯、熱更新）
```

在正式環境中，應預編譯以優化打包體積：
``` sh
pnpm build
pnpm start
```


## 技術棧

本專案採 [T3 Stack](https://create.t3.gg/) 作爲初始模板，承繼使用以下框架/庫：

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
