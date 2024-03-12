import { type NewBook } from "~/server/api/routers/book/crud";

const 線性代數及其應用: NewBook = {
  name: "線性代數及其應用（原書第六版）",
  form: "現代出版品",
  authors: ["David Lay", "Steven Lay", "Judi McDonald"],
  translators: ["劉深泉", "陳玉珍", "張萬芹"],
  originalName: "Linear Algebra and Its Applications, 6/e",
  ISBN: "9787111728030",
  pageNumber: 662,
  date: new Date("2023-07-01"),
  materialNames: ["習題", "練習題"],
  TOCTree: [
    {
      id: 1,
      parent: 0,
      text: "譯者序",
    },
    {
      id: 2,
      parent: 0,
      text: "前言",
    },
    {
      id: 3,
      parent: 0,
      text: "給學生的註釋",
    },
    {
      id: 4,
      parent: 0,
      text: "關於作者",
    },
    {
      id: 5,
      parent: 0,
      text: "第1章 線性代數中的線性方程組",
    },
    {
      id: 6,
      parent: 5,
      text: "介紹性實例：經濟學與工程中的線性模型",
    },
    {
      id: 7,
      parent: 5,
      text: "1.1 線性方程組",
      data: {
        chapterMaterials: {
          習題: 44,
          練習題: 4,
        },
      },
    },
    {
      id: 8,
      parent: 5,
      text: "1.2 行化簡與階梯形矩陣",
      data: {
        chapterMaterials: {
          習題: 46,
          練習題: 3,
        },
      },
    },
    {
      id: 9,
      parent: 5,
      text: "1.3 向量方程",
      data: {
        chapterMaterials: {
          習題: 42,
          練習題: 3,
        },
      },
    },
    {
      id: 10,
      parent: 5,
      text: "1.4 矩陣方程Ax=b",
      data: {
        chapterMaterials: {
          習題: 52,
          練習題: 3,
        },
      },
    },
    {
      id: 11,
      parent: 5,
      text: "1.5 線性方程組的解集",
      data: {
        chapterMaterials: {
          習題: 52,
          練習題: 3,
        },
      },
    },
    {
      id: 12,
      parent: 5,
      text: "1.6 線性方程組的應用",
      data: {
        chapterMaterials: {
          習題: 14,
          練習題: 2,
        },
      },
    },
    {
      id: 13,
      parent: 5,
      text: "1.7 向量的線性相關性",
      data: {
        chapterMaterials: {
          習題: 50,
          練習題: 2,
        },
      },
    },
    {
      id: 14,
      parent: 5,
      text: "1.8 線性變換簡介",
      data: {
        chapterMaterials: {
          習題: 48,
          練習題: 3,
        },
      },
    },
    {
      id: 15,
      parent: 5,
      text: "1.9 線性變換的矩陣",
      data: {
        chapterMaterials: {
          習題: 48,
          練習題: 2,
        },
      },
    },
    {
      id: 16,
      parent: 5,
      text: "1.10 商業、科學和工程中的線性模型",
      data: {
        chapterMaterials: {
          習題: 14,
          練習題: 1,
        },
      },
    },
    {
      id: 17,
      parent: 5,
      text: "課題研究",
    },
    {
      id: 18,
      parent: 5,
      text: "補充習題",
      data: {
        chapterMaterials: {
          習題: 49,
          練習題: 0,
        },
      },
    },
    {
      id: 19,
      parent: 0,
      text: "第2章 矩陣代數",
    },
    {
      id: 20,
      parent: 19,
      text: "介紹性實例：飛機設計中的計算機模型",
    },
    {
      id: 21,
      parent: 19,
      text: "2.1 矩陣運算",
      data: {
        chapterMaterials: {
          習題: 52,
          練習題: 3,
        },
      },
    },
    {
      id: 22,
      parent: 19,
      text: "2.2 矩陣的逆",
      data: {
        chapterMaterials: {
          習題: 52,
          練習題: 3,
        },
      },
    },
    {
      id: 23,
      parent: 19,
      text: "2.3 可逆矩陣的特徵",
      data: {
        chapterMaterials: {
          習題: 53,
          練習題: 3,
        },
      },
    },
    {
      id: 24,
      parent: 19,
      text: "2.4 分塊矩陣",
      data: {
        chapterMaterials: {
          習題: 29,
          練習題: 2,
        },
      },
    },
    {
      id: 25,
      parent: 19,
      text: "2.5 矩陣分解",
      data: {
        chapterMaterials: {
          習題: 32,
          練習題: 1,
        },
      },
    },
    {
      id: 26,
      parent: 19,
      text: "2.6 列昂惕夫投入-產出模型",
      data: {
        chapterMaterials: {
          習題: 15,
          練習題: 1,
        },
      },
    },
    {
      id: 27,
      parent: 19,
      text: "2.7 在計算機圖形學中的應用",
      data: {
        chapterMaterials: {
          習題: 22,
          練習題: 1,
        },
      },
    },
    {
      id: 28,
      parent: 19,
      text: "2.8 R^n的子空間",
      data: {
        chapterMaterials: {
          習題: 46,
          練習題: 3,
        },
      },
    },
    {
      id: 29,
      parent: 19,
      text: "2.9 維數與秩",
      data: {
        chapterMaterials: {
          習題: 38,
          練習題: 3,
        },
      },
    },
    {
      id: 30,
      parent: 19,
      text: "課題研究",
    },
    {
      id: 31,
      parent: 19,
      text: "補充習題",
      data: {
        chapterMaterials: {
          習題: 34,
          練習題: 0,
        },
      },
    },
    {
      id: 32,
      parent: 0,
      text: "第3章 行列式",
    },
    {
      id: 33,
      parent: 32,
      text: "介紹性實例：稱鑽石",
    },
    {
      id: 34,
      parent: 32,
      text: "3.1 行列式簡介",
      data: {
        chapterMaterials: {
          習題: 52,
          練習題: 1,
        },
      },
    },
    {
      id: 35,
      parent: 32,
      text: "3.2 行列式的性質",
      data: {
        chapterMaterials: {
          習題: 54,
          練習題: 3,
        },
      },
    },
    {
      id: 36,
      parent: 32,
      text: "3.3 克拉默法則、體積和線性變換",
      data: {
        chapterMaterials: {
          習題: 41,
          練習題: 1,
        },
      },
    },
    {
      id: 37,
      parent: 32,
      text: "課題研究",
    },
    {
      id: 38,
      parent: 32,
      text: "補充習題",
      data: {
        chapterMaterials: {
          習題: 34,
          練習題: 0,
        },
      },
    },
    {
      id: 39,
      parent: 0,
      text: "第4章 向量空間",
    },
    {
      id: 40,
      parent: 39,
      text: "介紹性實例：離散時間信號和數字信號處理",
    },
    {
      id: 41,
      parent: 39,
      text: "4.1 向量空間與子空間",
      data: {
        chapterMaterials: {
          習題: 46,
          練習題: 3,
        },
      },
    },
    {
      id: 42,
      parent: 39,
      text: "4.2 零空間、列空間、行空間和線性變換",
      data: {
        chapterMaterials: {
          習題: 52,
          練習題: 3,
        },
      },
    },
    {
      id: 43,
      parent: 39,
      text: "4.3 線性無關集和基",
      data: {
        chapterMaterials: {
          習題: 48,
          練習題: 4,
        },
      },
    },
    {
      id: 44,
      parent: 39,
      text: "4.4 坐標系",
      data: {
        chapterMaterials: {
          習題: 42,
          練習題: 2,
        },
      },
    },
    {
      id: 45,
      parent: 39,
      text: "4.5 向量空間的維數",
      data: {
        chapterMaterials: {
          習題: 54,
          練習題: 2,
        },
      },
    },
    {
      id: 46,
      parent: 39,
      text: "4.6 基的變換",
      data: {
        chapterMaterials: {
          習題: 22,
          練習題: 2,
        },
      },
    },
    {
      id: 47,
      parent: 39,
      text: "4.7 數字信號處理",
      data: {
        chapterMaterials: {
          習題: 32,
          練習題: 3,
        },
      },
    },
    {
      id: 48,
      parent: 39,
      text: "4.8 在差分方程中的應用",
      data: {
        chapterMaterials: {
          習題: 36,
          練習題: 1,
        },
      },
    },
    {
      id: 49,
      parent: 39,
      text: "課題研究",
    },
    {
      id: 50,
      parent: 39,
      text: "補充習題",
      data: {
        chapterMaterials: {
          習題: 40,
          練習題: 0,
        },
      },
    },
    {
      id: 51,
      parent: 0,
      text: "第5章 特徵值與特徵向量",
    },
    {
      id: 52,
      parent: 51,
      text: "介紹性實例：動力系統與斑點貓頭鷹",
    },
    {
      id: 53,
      parent: 51,
      text: "5.1 特徵向量與特徵值",
      data: {
        chapterMaterials: {
          習題: 48,
          練習題: 4,
        },
      },
    },
    {
      id: 54,
      parent: 51,
      text: "5.2 特徵方程",
      data: {
        chapterMaterials: {
          習題: 35,
          練習題: 1,
        },
      },
    },
    {
      id: 55,
      parent: 51,
      text: "5.3 對角化",
      data: {
        chapterMaterials: {
          習題: 42,
          練習題: 3,
        },
      },
    },
    {
      id: 56,
      parent: 51,
      text: "5.4 特徵向量與線性變換",
      data: {
        chapterMaterials: {
          習題: 35,
          練習題: 2,
        },
      },
    },
    {
      id: 57,
      parent: 51,
      text: "5.5 複特徵值",
      data: {
        chapterMaterials: {
          習題: 32,
          練習題: 1,
        },
      },
    },
    {
      id: 58,
      parent: 51,
      text: "5.6 離散動力系統",
      data: {
        chapterMaterials: {
          習題: 18,
          練習題: 2,
        },
      },
    },
    {
      id: 59,
      parent: 51,
      text: "5.7 在微分方程中的應用",
      data: {
        chapterMaterials: {
          習題: 22,
          練習題: 3,
        },
      },
    },
    {
      id: 60,
      parent: 51,
      text: "5.8 特徵值的迭代估計",
      data: {
        chapterMaterials: {
          習題: 21,
          練習題: 1,
        },
      },
    },
    {
      id: 61,
      parent: 51,
      text: "5.9 在馬爾可夫鏈中的應用",
      data: {
        chapterMaterials: {
          習題: 32,
          練習題: 3,
        },
      },
    },
    {
      id: 62,
      parent: 51,
      text: "課題研究",
    },
    {
      id: 63,
      parent: 51,
      text: "補充習題",
      data: {
        chapterMaterials: {
          習題: 48,
          練習題: 0,
        },
      },
    },
    {
      id: 64,
      parent: 0,
      text: "第6章 正交性和最小二乘法",
    },
    {
      id: 65,
      parent: 64,
      text: "介紹性實例：人工智能和機器學習",
    },
    {
      id: 66,
      parent: 64,
      text: "6.1 內積、長度和正交性",
      data: {
        chapterMaterials: {
          習題: 42,
          練習題: 3,
        },
      },
    },
    {
      id: 67,
      parent: 64,
      text: "6.2 正交集",
      data: {
        chapterMaterials: {
          習題: 44,
          練習題: 4,
        },
      },
    },
    {
      id: 68,
      parent: 64,
      text: "6.3 正交投影",
      data: {
        chapterMaterials: {
          習題: 38,
          練習題: 2,
        },
      },
    },
    {
      id: 69,
      parent: 64,
      text: "6.4 格拉姆-施密特方法",
      data: {
        chapterMaterials: {
          習題: 30,
          練習題: 2,
        },
      },
    },
    {
      id: 70,
      parent: 64,
      text: "6.5 最小二乘問題",
      data: {
        chapterMaterials: {
          習題: 34,
          練習題: 2,
        },
      },
    },
    {
      id: 71,
      parent: 64,
      text: "6.6 機器學習和線性模型",
      data: {
        chapterMaterials: {
          習題: 26,
          練習題: 1,
        },
      },
    },
    {
      id: 72,
      parent: 64,
      text: "6.7 內積空間",
      data: {
        chapterMaterials: {
          習題: 34,
          練習題: 2,
        },
      },
    },
    {
      id: 73,
      parent: 64,
      text: "6.8 內積空間的應用",
      data: {
        chapterMaterials: {
          習題: 16,
          練習題: 2,
        },
      },
    },
    {
      id: 74,
      parent: 64,
      text: "課題研究",
    },
    {
      id: 75,
      parent: 64,
      text: "補充習題",
      data: {
        chapterMaterials: {
          習題: 38,
          練習題: 0,
        },
      },
    },
    {
      id: 76,
      parent: 0,
      text: "第7章 對稱矩陣和二次型",
    },
    {
      id: 77,
      parent: 76,
      text: "介紹性實例：多波段的圖像處理",
    },
    {
      id: 78,
      parent: 76,
      text: "7.1 對稱矩陣的對角化",
      data: {
        chapterMaterials: {
          習題: 46,
          練習題: 2,
        },
      },
    },
    {
      id: 79,
      parent: 76,
      text: "7.2 二次型",
      data: {
        chapterMaterials: {
          習題: 36,
          練習題: 1,
        },
      },
    },
    {
      id: 80,
      parent: 76,
      text: "7.3 條件優化",
      data: {
        chapterMaterials: {
          習題: 17,
          練習題: 2,
        },
      },
    },
    {
      id: 81,
      parent: 76,
      text: "7.4 奇異值分解",
      data: {
        chapterMaterials: {
          習題: 29,
          練習題: 2,
        },
      },
    },
    {
      id: 82,
      parent: 76,
      text: "7.5 在圖像處理和統計學中的應用",
      data: {
        chapterMaterials: {
          習題: 13,
          練習題: 2,
        },
      },
    },
    {
      id: 83,
      parent: 76,
      text: "課題研究",
    },
    {
      id: 84,
      parent: 76,
      text: "補充習題",
      data: {
        chapterMaterials: {
          習題: 32,
          練習題: 0,
        },
      },
    },
    {
      id: 85,
      parent: 0,
      text: "第8章 向量空間的幾何學",
    },
    {
      id: 86,
      parent: 85,
      text: "介紹性實例：柏拉圖多面體",
    },
    {
      id: 87,
      parent: 85,
      text: "8.1 仿射組合",
      data: {
        chapterMaterials: {
          習題: 34,
          練習題: 1,
        },
      },
    },
    {
      id: 88,
      parent: 85,
      text: "8.2 仿射無關性",
      data: {
        chapterMaterials: {
          習題: 34,
          練習題: 2,
        },
      },
    },
    {
      id: 89,
      parent: 85,
      text: "8.3 凸組合",
      data: {
        chapterMaterials: {
          習題: 28,
          練習題: 2,
        },
      },
    },
    {
      id: 90,
      parent: 85,
      text: "8.4 超平面",
      data: {
        chapterMaterials: {
          習題: 36,
          練習題: 1,
        },
      },
    },
    {
      id: 91,
      parent: 85,
      text: "8.5 多面體",
      data: {
        chapterMaterials: {
          習題: 28,
          練習題: 1,
        },
      },
    },
    {
      id: 92,
      parent: 85,
      text: "8.6 曲線與曲面",
      data: {
        chapterMaterials: {
          習題: 22,
          練習題: 2,
        },
      },
    },
    {
      id: 93,
      parent: 85,
      text: "課題研究",
    },
    {
      id: 94,
      parent: 85,
      text: "補充習題",
      data: {
        chapterMaterials: {
          習題: 35,
          練習題: 0,
        },
      },
    },
    {
      id: 95,
      parent: 0,
      text: "第9章 優化",
    },
    {
      id: 96,
      parent: 95,
      text: "介紹性實例：柏林空運",
    },
    {
      id: 97,
      parent: 95,
      text: "9.1 矩陣博弈",
      data: {
        chapterMaterials: {
          習題: 34,
          練習題: 1,
        },
      },
    },
    {
      id: 98,
      parent: 95,
      text: "9.2 線性規劃——幾何方法",
      data: {
        chapterMaterials: {
          習題: 21,
          練習題: 4,
        },
      },
    },
    {
      id: 99,
      parent: 95,
      text: "9.3 線性規劃——單純形法",
      data: {
        chapterMaterials: {
          習題: 22,
          練習題: 1,
        },
      },
    },
    {
      id: 100,
      parent: 95,
      text: "9.4 對偶問題",
      data: {
        chapterMaterials: {
          習題: 28,
          練習題: 3,
        },
      },
    },
    {
      id: 101,
      parent: 95,
      text: "課題研究",
    },
    {
      id: 102,
      parent: 95,
      text: "補充習題",
      data: {
        chapterMaterials: {
          習題: 32,
          練習題: 0,
        },
      },
    },
    {
      id: 103,
      parent: 0,
      text: "附錄",
    },
    {
      id: 104,
      parent: 103,
      text: "附錄A 簡化階梯形矩陣的唯一性",
    },
    {
      id: 105,
      parent: 103,
      text: "附錄B 複數",
    },
    {
      id: 106,
      parent: 0,
      text: "術語表",
    },
    {
      id: 107,
      parent: 0,
      text: "奇數習題答案",
    },
  ],
};

export default 線性代數及其應用;
