import axios from 'axios';

interface ParseDataParams {
  en: string;
  author: string;
}

interface ParseDataReturn {
  quote: string;
  author: string;
}

const parseData = (data: ParseDataParams) => {
  return {
    quote: data.en,
    author: data.author
  };
};

// Recursively find a random quote of correct length.
const randomQuote = (data: ParseDataParams[]): ParseDataParams => {
  let randQuote = data[Math.floor(Math.random() * data.length)];
  return randQuote.en.length < 220 ? randQuote : randomQuote(data);
};

export async function fetchQuotes(): Promise<ParseDataReturn> {
  // NOTE: Heroku has no more free tier. Time for new API?
  // const response = await axios.get(
  //   'https://programming-quotes-api.herokuapp.com/Quotes/random'
  // );
  // Well it did stop haha.

  const response = await axios.get(
    'https://raw.githubusercontent.com/mudroljub/programming-quotes-api/master/data/quotes.json'
  );

  const data = response.data;

  // Get a random Quote.
  let randQuote = randomQuote(data);

  // Parse the data and return it.
  return parseData(randQuote);
}
