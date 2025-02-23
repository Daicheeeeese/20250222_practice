import { NextResponse } from 'next/server';
import { translateText } from '@/lib/azure-translator';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    const translation = await translateText(text);

    if (!translation) {
      return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
    }

    return NextResponse.json({ translation });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 