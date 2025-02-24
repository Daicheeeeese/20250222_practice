import { NextResponse } from 'next/server';
import { generateExample } from '@/lib/openai';
import { translateText } from '@/lib/azure-translator';

export async function POST(request: Request) {
  try {
    const { word } = await request.json();
    console.log('Processing word:', word);

    let example;
    try {
      example = await generateExample(word);
      console.log('Example generated:', example);
    } catch (error) {
      console.error('Example generation error:', error);
      return NextResponse.json({ 
        error: 'Example generation failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }

    if (!example) {
      return NextResponse.json({ error: 'No example generated' }, { status: 500 });
    }

    let translation;
    try {
      translation = await translateText(example);
      console.log('Translation completed:', translation);
    } catch (error) {
      console.error('Translation error:', error);
      return NextResponse.json({ 
        error: 'Translation failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }

    if (!translation) {
      return NextResponse.json({ error: 'No translation generated' }, { status: 500 });
    }

    return NextResponse.json({
      example,
      translation
    });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 