export interface Joke {
  id: string;
  setup: string;
  punchline: string;
}

// Initial jokes
const defaultJokes: Joke[] = [
  {
    id: "1",
    setup: "Why don't programmers like nature?",
    punchline: "It has too many bugs!",
  },
  {
    id: "2",
    setup: "What do you call a bear with no teeth?",
    punchline: "A gummy bear!",
  },
];

let jokes = [...defaultJokes];

export const getRandomJoke = (): Joke => {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  return jokes[randomIndex];
};

export const addJoke = (joke: Omit<Joke, "id">) => {
  const id = (jokes.length + 1).toString();
  jokes.push({ ...joke, id });
};

export const getAllJokes = (): Joke[] => jokes;

export const deleteJoke = (id: string) => {
  jokes = jokes.filter((joke) => joke.id !== id);
};