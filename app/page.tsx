import { articles } from '@/data/articles'

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Articles</h1>
      <div className="space-y-4">
        {articles.map(article => (
          <div key={article.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="mt-2 text-gray-600">{article.content}</p>
            <div className="mt-2 text-sm text-gray-500">{article.date}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
