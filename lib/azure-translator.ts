const AZURE_TRANSLATOR_KEY = process.env.AZURE_TRANSLATOR_KEY;
const AZURE_TRANSLATOR_REGION = process.env.AZURE_TRANSLATOR_REGION;
const AZURE_TRANSLATOR_ENDPOINT = 'https://api.cognitive.microsofttranslator.com';

export async function getDictionaryMeanings(word: string) {
  try {
    // 意味の取得
    const meaningResponse = await fetch(`${AZURE_TRANSLATOR_ENDPOINT}/dictionary/lookup?api-version=3.0&from=en&to=ja`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_TRANSLATOR_KEY!,
        'Ocp-Apim-Subscription-Region': AZURE_TRANSLATOR_REGION!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ text: word }]),
    });

    if (!meaningResponse.ok) {
      throw new Error('Dictionary lookup failed');
    }

    const meaningData = await meaningResponse.json();
    console.log('API Response:', meaningData); // APIレスポンスを確認

    const meaning = meaningData[0]?.translations[0]?.displayTarget || '';
    console.log('Extracted meaning:', meaning); // 抽出した意味を確認

    return {
      meanings: [meaning], // 最初の意味だけを使用
      synonyms: [] // 類義語は空配列
    };

  } catch (error) {
    console.error('Dictionary lookup error:', error);
    console.error('Full error:', JSON.stringify(error, null, 2)); // エラーの詳細を確認
    return {
      meanings: [],
      synonyms: []
    };
  }
}

export async function translateText(text: string, from: string = 'en', to: string = 'ja') {
  try {
    const response = await fetch(`${AZURE_TRANSLATOR_ENDPOINT}/translate?api-version=3.0&from=${from}&to=${to}`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_TRANSLATOR_KEY!,
        'Ocp-Apim-Subscription-Region': AZURE_TRANSLATOR_REGION!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ text }]),
    });

    if (!response.ok) {
      throw new Error('Translation failed');
    }

    const data = await response.json();
    return data[0].translations[0].text;
  } catch (error) {
    console.error('Translation error:', error);
    return null;
  }
} 