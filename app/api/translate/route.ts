import { NextResponse } from 'next/server';
import { translateText } from '@/lib/azure-translator';
import { generateMeanings } from '@/lib/openai';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    
    // OpenAIで3つの意味を生成
    const meanings = await generateMeanings(text);
    if (!meanings) {
      return NextResponse.json({ error: 'Meanings generation failed' }, { status: 500 });
    }

    // 各意味を翻訳
    const translations = await Promise.all(
      meanings.map(meaning => translateText(meaning))
    );

    return NextResponse.json({ translations });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 