'use client'

import Tippy from '@tippyjs/react'
import { useState, useEffect } from 'react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'

type HoverWordProps = {
  word: string
  data?: {
    example: {
      en: string
      ja: string
    }
  }
}

export function HoverWord({ word }: HoverWordProps) {
  const [translation, setTranslation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: word }),
        });

        if (!response.ok) {
          throw new Error('Translation failed');
        }

        const data = await response.json();
        setTranslation(data.translation);
      } catch (error) {
        console.error('Translation error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranslation();
  }, [word]);

  return (
    <Tippy
      content={
        <div className="p-3">
          <div className="meaning-box">
            {isLoading ? '翻訳中...' : translation || '翻訳エラー'}
          </div>
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