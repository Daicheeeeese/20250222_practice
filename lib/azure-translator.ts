const AZURE_TRANSLATOR_KEY = process.env.AZURE_TRANSLATOR_KEY;
const AZURE_TRANSLATOR_REGION = process.env.AZURE_TRANSLATOR_REGION;
const AZURE_TRANSLATOR_ENDPOINT = 'https://api.cognitive.microsofttranslator.com';

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