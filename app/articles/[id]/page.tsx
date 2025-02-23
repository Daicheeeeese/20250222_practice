import { articles, type Article } from '@/data/articles'
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

  // 単語を HoverWord コンポーネントでラップする関数
  const renderContent = (content: string, words: Article['words']) => {
    let result = content;
    Object.keys(words).forEach((word) => {
      const regex = new RegExp(`(${word})`, 'g');
      result = result.replace(regex, `___${word}___`);
    });

    return result.split('___').map((part, index) => {
      const wordData = article.words[part];
      return wordData ? 
        <HoverWord key={index} word={part} data={wordData} /> : 
        part;
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
          <div className="text-gray-600 mb-8">{article.date}</div>
          <p className="whitespace-pre-wrap">
            {renderContent(article.content, article.words)}
          </p>
        </article>
        
        <DiscussionRequest />
      </div>
    </main>
  )
} 