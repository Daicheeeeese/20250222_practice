export type Article = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export const articles: Article[] = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    content: "Next.js is a powerful framework for building React applications. It provides features like server-side rendering, static site generation, and more.",
    date: "2024-02-22"
  },
  {
    id: 2,
    title: "Understanding TypeScript",
    content: "TypeScript adds static typing to JavaScript, making it easier to catch errors early and improve code maintainability.",
    date: "2024-02-23"
  }
];
