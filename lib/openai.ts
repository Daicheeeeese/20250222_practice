import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateMeanings(word: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that provides word meanings. Respond with exactly 3 different meanings or usages of the word, separated by '|'. Keep each meaning concise and in English."
        },
        {
          role: "user",
          content: `What are 3 different meanings or usages of the word "${word}"?`
        }
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    if (!content) return null;
    
    return content.split('|').map(m => m.trim());
  } catch (error) {
    console.error('OpenAI API error:', error);
    return null;
  }
}

export async function generateExample(word: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates simple example sentences for English words. Respond with only the example sentence, nothing else."
        },
        {
          role: "user",
          content: `Generate a simple example sentence using the word "${word}".`
        }
      ],
      max_tokens: 50,
      temperature: 0.7,
    });

    return response.choices[0].message.content?.trim();
  } catch (error) {
    console.error('OpenAI API error:', error);
    return null;
  }
} 