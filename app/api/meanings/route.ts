import { NextResponse } from 'next/server';
import { getDictionaryMeanings } from '@/lib/azure-translator';

export async function POST(request: Request) {
  try {
    const { word } = await request.json();
    
    const result = await getDictionaryMeanings(word);
    if (!result) {
      return NextResponse.json({ error: 'Failed to get meanings' }, { status: 500 });
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 