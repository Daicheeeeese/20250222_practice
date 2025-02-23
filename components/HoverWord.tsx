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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // 意味と類義語を取得
        const meaningsResponse = await fetch('/api/meanings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ word }),
        });

        if (!meaningsResponse.ok) throw new Error('Failed to fetch meanings');
        const data = await meaningsResponse.json();
        setMeanings(data.meanings);
        setSynonyms(data.synonyms);

        // 例文を取得
        const exampleResponse = await fetch('/api/generate-example', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ word }),
        });

        if (!exampleResponse.ok) throw new Error('Failed to fetch example');
        const exampleData = await exampleResponse.json();
        setExample({
          en: exampleData.example,
          ja: exampleData.translation,
        });

      } catch (error) {
        console.error('API error:', error);
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
          <div className="meanings-box mb-2">
            {isLoading ? (
              <div>読み込み中...</div>
            ) : meanings ? (
              <div>
                <div className="font-bold mb-1 text-gray-700">意味:</div>
                {meanings.map((meaning, index) => (
                  <div key={index} className="meaning-item mb-2">
                    <div className="text-gray-600 text-sm">{meaning}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div>意味を取得できませんでした</div>
            )}
          </div>
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