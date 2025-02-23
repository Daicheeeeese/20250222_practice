import Link from 'next/link'
import { articles } from '@/data/articles'

export default function Home() {
  return (
    <main className="container">
      <h1 className="text-3xl font-bold mb-8">BBC News</h1>
      <div className="articles-grid">
        {articles.map((article) => (
          <Link 
            key={article.id} 
            href={`/articles/${article.id}`}
            className="article-card"
          >
            <article>
              <div className="article-card-header">
                <div className="title-section">
                  <div className="badge-container">
                    <span className={`category-badge ${article.category.toLowerCase()}`}>
                      {article.category}
                    </span>
                    <span className={`level-badge ${article.level.toLowerCase()}`}>
                      {article.level}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold">{article.title}</h2>
                </div>
              </div>
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
