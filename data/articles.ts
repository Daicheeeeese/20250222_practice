export type Article = {
  id: number;
  title: string;
  content: string;
  date: string;
  words: {
    [key: string]: {
      meaning: string;
      example: {
        en: string;
        ja: string;
      };
    };
  };
};

export const articles: Article[] = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    content: "Next.js is a powerful framework for building React applications. It provides features like server-side rendering, static site generation, and more.",
    date: "2024-02-22",
    words: {
      "Next.js": {
        meaning: "Reactベースのフルスタックフレームワーク",
        example: {
          en: "Next.js makes it easy to create full-stack web applications.",
          ja: "Next.jsを使用すると、フルスタックWebアプリケーションを簡単に作成できます。"
        }
      },
      "framework": {
        meaning: "ソフトウェア開発の基盤となる骨組み",
        example: {
          en: "Using a framework can speed up the development process.",
          ja: "フレームワークを使用すると開発プロセスを迅速化できます。"
        }
      },
      "server-side rendering": {
        meaning: "サーバー側でHTMLを生成する技術",
        example: {
          en: "Server-side rendering improves the initial page load time.",
          ja: "サーバーサイドレンダリングは初期ページの読み込み時間を改善します。"
        }
      }
    }
  },
  {
    id: 2,
    title: "Understanding TypeScript",
    content: "TypeScript adds static typing to JavaScript, making it easier to catch errors early and improve code maintainability.",
    date: "2024-02-23",
    words: {
      "TypeScript": {
        meaning: "JavaScriptに型システムを追加した言語",
        example: {
          en: "TypeScript helps catch type-related bugs before runtime.",
          ja: "TypeScriptは実行時前に型関連のバグを捕捉するのに役立ちます。"
        }
      },
      "static typing": {
        meaning: "変数や関数の型を事前に定義する方式",
        example: {
          en: "Static typing helps prevent type-related errors during development.",
          ja: "静的型付けは開発中の型関連エラーを防ぐのに役立ちます。"
        }
      }
    }
  }
];
