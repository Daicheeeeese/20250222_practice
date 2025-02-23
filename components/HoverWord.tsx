'use client'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'

type Props = {
  word: string;
  data: {
    meaning: string;
    example: {
      en: string;
      ja: string;
    };
  };
}

export function HoverWord({ word, data }: Props) {
  const content = (
    <div className="p-1">
      <div className="font-bold mb-2">{data.meaning}</div>
      <div className="text-sm">
        <p className="mb-1 text-gray-700">{data.example.en}</p>
        <p className="text-gray-600">{data.example.ja}</p>
      </div>
    </div>
  );

  return (
    <Tippy 
      content={content}
      placement="bottom"
      arrow={true}
      animation="fade"
      delay={[100, 0]}
      theme="custom"
      interactive={true}
      maxWidth={400}
    >
      <span className="border-b border-dotted border-gray-400 cursor-help">
        {word}
      </span>
    </Tippy>
  )
} 