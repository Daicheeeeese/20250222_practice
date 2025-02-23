export type Article = {
  id: number;
  title: string;
  date: string;
  content: string;
  words: {
    [key: string]: {
      meaning: string;
      example: {
        en: string;
        ja: string;
      }
    }
  }
}

export const articles: Article[] = [
  {
    id: 1,
    title: "How much protein do you really need to get strong?",
    date: "2024-02-28",
    content: `From raw eggs to protein shakes, those hoping to expand their brawn are often encouraged to ingest vast quantities of protein. But how much is really necessary and what's the best way to consume it?

Sophia Moulson, 21, a fitness influencer based in West Sussex, began taking fitness seriously at the age of 19, after struggling with being overweight.

"I often turned to food as a source of comfort, which ultimately left me in a cycle of negative self-image and low confidence. One day, I realised that I needed to take control – not just for my physical health but for my mental wellbeing too," says Moulson.

Initially, she joined the gym with the sole intention of losing weight. But over time, she fell in love with the process of building up a healthy amount of muscle too. "I discovered how empowering it felt to grow stronger, and each small strength milestone motivated me to keep pushing forward," she says.

An integral part of Moulson's progress was research on nutrition. That's when she learned about the importance of protein for building muscle. However, as a vegetarian, Moulson initially felt that she was struggling to get enough protein through just her diet, so she turned to protein powders. "While it was possible for me to meet my needs through a well-balanced diet, it often required time and careful planning. Protein powders offered a convenient solution, especially with my busy lifestyle," she says.`,
    words: {
      "brawn": {
        meaning: "筋肉、体力",
        example: {
          en: "He has the brawn but not the brains.",
          ja: "彼は頭脳より筋肉がある。"
        }
      },
      "ingest": {
        meaning: "摂取する、飲み込む",
        example: {
          en: "It's important to ingest enough vitamins.",
          ja: "十分なビタミンを摂取することが重要です。"
        }
      },
      "influencer": {
        meaning: "影響力のある人、インフルエンサー",
        example: {
          en: "Social media influencers can shape public opinion.",
          ja: "ソーシャルメディアのインフルエンサーは世論を形成することができます。"
        }
      }
    }
  },
  {
    id: 2,
    title: "Cryptocurrency theft of £1.1bn could be biggest ever",
    date: "2024-02-29",
    content: `Cryptocurrency firm Bybit said hackers stole $1.5bn (£1.1bn) worth of digital currency in what could be the biggest crypto theft in history.

The Dubai-based company's founder told users that their funds were "safe" and that it would refund any of those affected.

It said hackers stole from its Ethereum coin digital wallet. Ethereum is the second largest cryptocurrency by value after Bitcoin.

Bybit's founder Ben Zhou said the money could be covered by the firm or by a loan from partners. Bybit holds $20bn (£15bn) in assets.

Bybit said the hackers exploited security features, then transferred the money to an unidentified address.

After the theft, the value of Ethereum fell by around 4% on Friday, leaving it worth $2,641.41 (£2,090) per coin.

The scale of the theft would exceed a previous record, which was a $620m (£490m) heist of Ethereum and USD Coin from the Ronin Network in 2022.`,
    words: {
      "cryptocurrency": {
        meaning: "暗号通貨",
        example: {
          en: "Bitcoin was the first cryptocurrency to gain widespread adoption.",
          ja: "ビットコインは広く普及した最初の暗号通貨でした。"
        }
      },
      "theft": {
        meaning: "窃盗、盗難",
        example: {
          en: "The police are investigating the theft of valuable paintings.",
          ja: "警察は価値のある絵画の盗難を捜査しています。"
        }
      },
      "refund": {
        meaning: "返金する、払い戻す",
        example: {
          en: "The store offered to refund the full amount.",
          ja: "店は全額返金を申し出ました。"
        }
      }
    }
  }
];
