import { NextResponse } from 'next/server';
import { generateExample } from '@/lib/openai';
import { translateText } from '@/lib/azure-translator';

export async function POST(request: Request) {
  try {
    const { word } = await request.json();
    
    // OpenAIで例文を生成
    const example = await generateExample(word);
    if (!example) {
      return NextResponse.json({ error: 'Example generation failed' }, { status: 500 });
    }

    // Azureで例文を翻訳
    const translation = await translateText(example);
    if (!translation) {
      return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
    }

    return NextResponse.json({ 
      example,
      translation 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 