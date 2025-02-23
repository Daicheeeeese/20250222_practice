import { articles } from '@/data/articles'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// 型定義を削除し、直接パラメータを定義
export default async function ArticlePage({
  params,
}: {
  params: { id: string }
}) {
  const article = articles.find(a => a.id === parseInt(params.id))

  if (!article) {
    notFound()
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <Link 
        href="/" 
        className="text-blue-600 hover:text-blue-800 mb-6 block"
      >
        ← 記事一覧に戻る
      </Link>
      <article className="prose lg:prose-xl">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <div className="text-gray-600 mb-8">{article.date}</div>
        <p className="whitespace-pre-wrap">{article.content}</p>
      </article>
    </main>
  )
} 