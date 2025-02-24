'use client'

import Tippy from '@tippyjs/react'
import { useState, useEffect } from 'react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'

type HoverWordProps = {
  word: string
}

export function HoverWord({ word }: HoverWordProps) {
  const [meanings, setMeanings] = useState<string[] | null>(null);
  const [synonyms, setSynonyms] = useState<string[] | null>(null);
  const [example, setExample] = useState<{
    en: string;
    ja: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // 意味と類義語を取得
        const meaningsResponse = await fetch('/api/meanings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ word }),
        });

        if (!meaningsResponse.ok) {
          throw new Error('Failed to fetch meanings');
        }

        const data = await meaningsResponse.json();
        setMeanings(data.meanings);
        setSynonyms(data.synonyms);

        try {
          // 例文を取得（エラーが発生しても意味は表示する）
          const exampleResponse = await fetch('/api/generate-example', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ word }),
          });

          if (!exampleResponse.ok) {
            throw new Error('Failed to fetch example');
          }

          const exampleData = await exampleResponse.json();
          setExample({
            en: exampleData.example,
            ja: exampleData.translation,
          });
        } catch (exampleError) {
          console.error('Example fetch error:', exampleError);
          setError('例文の取得に失敗しました');
        }

      } catch (error) {
        console.error('API error:', error);
        setError('データの取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [word]);

  return (
    <Tippy
      content={
        <div className="p-3 min-w-[200px]">
          {isLoading ? (
            <div>読み込み中...</div>
          ) : (
            <>
              {meanings && meanings.length > 0 && (
                <div className="meanings-box mb-2">
                  <div className="font-bold mb-1 text-gray-700">意味:</div>
                  {meanings.map((meaning, index) => (
                    <div key={index} className="meaning-item mb-2">
                      <div className="text-gray-600 text-sm">{meaning}</div>
                    </div>
                  ))}
                </div>
              )}
              
              {synonyms && synonyms.length > 0 && (
                <div className="synonyms-box mb-2 border-t border-gray-200 pt-2">
                  <div className="font-bold mb-1 text-gray-700">Synonyms:</div>
                  <div className="text-blue-600 text-sm">
                    {synonyms.join(', ')}
                  </div>
                </div>
              )}

              {example && (
                <div className="example-box text-sm border-t border-gray-200 pt-2">
                  <div className="font-bold mb-1 text-gray-700">例文:</div>
                  <p className="mb-1 text-blue-600">{example.en}</p>
                  <p className="text-gray-600">{example.ja}</p>
                </div>
              )}

              {error && (
                <div className="text-red-500 text-sm mt-2">
                  {error}
                </div>
              )}
            </>
          )}
        </div>
      }
      theme="custom"
      placement="bottom"
      arrow={true}
      interactive={true}
    >
      <span className="hover-word">
        {word}
      </span>
    </Tippy>
  )
} 