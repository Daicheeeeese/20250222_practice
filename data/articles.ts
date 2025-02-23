export type Article = {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
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
    title: "Elon Musk sues OpenAI and Sam Altman over 'betrayal' of AI mission",
    date: "2024-03-01",
    category: "Technology",
    content: `Elon Musk is suing artificial intelligence company OpenAI and its chief executive Sam Altman, alleging they abandoned the company's original mission to benefit humanity in favour of profits.

The lawsuit claims OpenAI's close relationship with Microsoft has pushed it away from developing AI systems for the benefit of the public.

Mr Musk helped found OpenAI in 2015 but stepped down from its board in 2018.

OpenAI said it would "defend the integrity" of its mission and work.

Mr Musk is seeking damages and wants OpenAI to return to its non-profit roots.

The Tesla and SpaceX boss was one of several tech entrepreneurs who helped establish OpenAI as a non-profit organisation.

The company said its mission was to "ensure that artificial general intelligence benefits all of humanity".

But in 2019, OpenAI established a "capped-profit" company to help attract money from investors.

In the lawsuit, filed in San Francisco, Mr Musk alleges this shift meant OpenAI had "abandoned its mission to benefit humanity" and instead focused on maximising profits.`,
    words: {
      "sue": {
        meaning: "訴える、提訴する",
        example: {
          en: "The company was sued for breach of contract.",
          ja: "その会社は契約違反で訴えられました。"
        }
      },
      "allegation": {
        meaning: "申し立て、主張",
        example: {
          en: "He denied all allegations of misconduct.",
          ja: "彼は不正行為の申し立てをすべて否定しました。"
        }
      },
      "integrity": {
        meaning: "誠実さ、完全性",
        example: {
          en: "The company maintains its integrity in all business dealings.",
          ja: "その会社はすべての取引において誠実さを保っています。"
        }
      }
    }
  },
  {
    id: 2,
    title: "Apple fined £1.6bn for not telling users about cheaper music streaming options",
    date: "2024-03-01",
    category: "Business",
    content: `Apple has been fined £1.6bn ($2bn) by EU regulators for preventing music streaming services from informing users about cheaper subscription options outside its App Store.

The European Commission said Apple had abused its dominant position by imposing restrictions on app developers.

The restrictions prevented them from telling iOS users about alternative music subscription services that cost less.

Apple said it would appeal against the decision, which it called "flawed".

The fine follows a complaint from music streaming service Spotify in 2019.

The Swedish company said Apple was unfairly restricting rivals to its own Apple Music streaming service.

The European Commission said Apple's conduct, which lasted for almost a decade, may have led many iOS users to pay "significantly higher prices for music streaming subscriptions".

Margrethe Vestager, the EU's competition chief, said: "For a decade, Apple abused its dominant position in the market for the distribution of music streaming apps through the App Store."

She said the company's restrictions on developers meant "consumers had no idea there could be something cheaper available elsewhere".`,
    words: {
      "fine": {
        meaning: "罰金、罰金を科す",
        example: {
          en: "The company was fined for breaking environmental regulations.",
          ja: "その会社は環境規制違反で罰金を科されました。"
        }
      },
      "abuse": {
        meaning: "乱用する、悪用する",
        example: {
          en: "The company was accused of abusing its market position.",
          ja: "その会社は市場での地位を乱用したと非難されました。"
        }
      },
      "restriction": {
        meaning: "制限、規制",
        example: {
          en: "The government imposed new restrictions on imports.",
          ja: "政府は輸入に新しい制限を課しました。"
        }
      }
    }
  }
];
