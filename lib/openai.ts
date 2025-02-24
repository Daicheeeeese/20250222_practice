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
    console.log('OpenAI API Key exists:', !!process.env.OPENAI_API_KEY);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates example sentences. Provide a simple, natural example sentence using the given word."
        },
        {
          role: "user",
          content: `Create a simple example sentence using the word "${word}". The sentence should be easy to understand.`
        }
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    console.log('OpenAI Response:', response.choices[0]?.message);

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI API error:', error);
    return null;
  }
} 