import { articles } from '@/data/articles'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Articles</h1>
      <div className="space-y-4">
        {articles.map(article => (
          <div key={article.id} className="border p-4 rounded hover:bg-gray-50">
            <Link href={`/articles/${article.id}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800">
                {article.title}
              </h2>
            </Link>
            <p className="mt-2 text-gray-600">{article.content.substring(0, 100)}...</p>
            <div className="mt-2 text-sm text-gray-500">{article.date}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
