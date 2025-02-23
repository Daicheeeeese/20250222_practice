import Link from 'next/link'
import { articles } from '@/data/articles'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">BBC News</h1>
      <div className="space-y-6">
        {articles.map((article) => (
          <Link 
            key={article.id} 
            href={`/articles/${article.id}`}
            className="article-card"
          >
            <article>
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{article.date}</p>
              <p className="text-gray-700 line-clamp-3">
                {article.content.split('\n')[0]}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </main>
  )
}
