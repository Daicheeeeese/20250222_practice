import { articles } from '@/data/articles'
import { HoverWord } from '@/components/HoverWord'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DiscussionRequest } from '@/components/DiscussionRequest'
import { JoinDiscussionButton } from '@/components/JoinDiscussionButton'

type Params = { id: string }

export default function ArticlePage({ params }: { params: Params }) {
  const article = articles.find(a => a.id === parseInt(params.id))

  if (!article) {
    notFound()
  }

  // 記事の本文からすべての単語を検出して HoverWord コンポーネントでラップする
  const renderContent = (content: string) => {
    // 単語を分割（句読点や空白で区切る）
    const words = content.split(/([.,!?]|\s+)/);
    
    return words.map((word, index) => {
      // 空白や句読点はそのまま表示
      if (!word.trim() || /^[.,!?]$/.test(word)) {
        return word;
      }
      
      // 実際の単語の場合は HoverWord コンポーネントでラップ
      return (
        <HoverWord
          key={index}
          word={word}
        />
      );
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
          
          {/* ここにパートナー情報と参加ボタンを表示 */}
          {/* タイトル、カテゴリー、日付の後、本文の前に表示されます */}
          {article.status === 'confirmed' && (
            <div className="bg-white rounded-lg shadow p-4 mb-8">
              <h2 className="text-lg font-semibold mb-2">パートナー</h2>
              <p className="text-gray-700 mb-4">{article.partner || 'Not assigned'}</p>
              <JoinDiscussionButton />
            </div>
          )}

          <div className="prose max-w-none">
            {/* 本文 */}
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