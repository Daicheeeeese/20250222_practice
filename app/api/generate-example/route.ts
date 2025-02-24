import { NextResponse } from 'next/server';
import { generateExample } from '@/lib/openai';
import { translateText } from '@/lib/azure-translator';

export async function POST(request: Request) {
  try {
    const { word } = await request.json();
    console.log('Generating example for word:', word);

    // OpenAIで例文を生成
    const example = await generateExample(word);
    if (!example) {
      console.error('Failed to generate example');
      return NextResponse.json({ error: 'Example generation failed' }, { status: 500 });
    }

    console.log('Generated example:', example);

    // Azureで例文を翻訳
    const translation = await translateText(example);
    if (!translation) {
      console.error('Failed to translate example');
      return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
    }

    console.log('Translated example:', translation);

    return NextResponse.json({ 
      example,
      translation 
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 