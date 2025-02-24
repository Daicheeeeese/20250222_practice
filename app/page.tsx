import Link from 'next/link'
import { articles } from '@/data/articles'

export default function Home() {
  return (
    <main className="container">
      <h1 className="text-3xl font-bold mb-8">本日のおすすめ記事</h1>
      <div className="articles-grid">
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
