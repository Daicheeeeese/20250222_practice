import { articles } from '@/data/articles'
import { HoverWord } from '@/components/HoverWord'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DiscussionRequest } from '@/components/DiscussionRequest'

type Params = { id: string }

export default function ArticlePage({ params }: { params: Params }) {
  const article = articles.find(a => a.id === parseInt(params.id))

  if (!article) {
    notFound()
  }

  // 記事の本文から単語を検出して HoverWord コンポーネントでラップする
  const renderContent = (content: string) => {
    let result = content;
    
    // 記事内の単語を HoverWord コンポーネントに置き換える
    Object.entries(article.words).forEach(([word, data]) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      result = result.replace(regex, `<hover-word>${word}</hover-word>`);
    });

    // HTML文字列を配列に分割
    const parts = result.split(/(<hover-word>.*?<\/hover-word>)/);

    // 配列を React 要素に変換
    return parts.map((part, index) => {
      if (part.startsWith('<hover-word>')) {
        const word = part.replace(/<\/?hover-word>/g, '');
        return (
          <HoverWord
            key={index}
            word={word}
            data={article.words[word.toLowerCase()]}
          />
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <main className="article-container">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-800 mb-6 block"
        >
          ← 記事一覧に戻る
        </Link>
        <article className="prose lg:prose-xl">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <div className="flex gap-2 mb-6">
            <span className={`category-badge ${article.category.toLowerCase()}`}>
              {article.category}
            </span>
            <span className={`level-badge ${article.level.toLowerCase()}`}>
              {article.level}
            </span>
          </div>
          <div className="text-gray-600 mb-8">{article.date}</div>
          <div className="prose max-w-none">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {renderContent(paragraph)}
              </p>
            ))}
          </div>
        </article>
        
        <DiscussionRequest />
      </div>
    </main>
  )
} 