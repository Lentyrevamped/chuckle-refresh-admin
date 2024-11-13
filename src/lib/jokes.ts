export interface Joke {
  id: string;
  setup: string;
  punchline: string;
  isUserGenerated?: boolean;
}

// Initial jokes
const defaultJokes: Joke[] = [
  {
    id: "1",
    setup: "Why don't programmers like nature?",
    punchline: "It has too many bugs!",
    isUserGenerated: false,
  },
  {
    id: "2",
    setup: "What do you call a bear with no teeth?",
    punchline: "A gummy bear!",
    isUserGenerated: false,
  },
];

let jokes = [...defaultJokes];
let usedJokes = new Set<string>();

const generateRandomJoke = () => {
  const setup = `Why did the ${Math.random() < 0.5 ? 'developer' : 'programmer'} ${['quit', 'cross the road', 'go home'][Math.floor(Math.random() * 3)]}?`;
  const punchlines = [
    "Because they didn't get arrays!",
    "To git to the other side!",
    "Because they had too many bugs to fix!",
    "Because their code wouldn't compile!",
  ];
  return {
    setup,
    punchline: punchlines[Math.floor(Math.random() * punchlines.length)],
  };
};

export const getRandomJoke = (): Joke => {
  // First, try to get a user-generated joke that hasn't been used
  const userJokes = jokes.filter(joke => joke.isUserGenerated && !usedJokes.has(joke.id));
  
  // Then, try to get any joke that hasn't been used
  const availableJokes = userJokes.length > 0 
    ? userJokes 
    : jokes.filter(joke => !usedJokes.has(joke.id));

  // If we've used all jokes, generate a new one
  if (availableJokes.length === 0) {
    const newJoke = generateRandomJoke();
    const id = (jokes.length + 1).toString();
    const generatedJoke = { ...newJoke, id, isUserGenerated: false };
    jokes.push(generatedJoke);
    return generatedJoke;
  }

  // Get a random joke from available ones
  const randomIndex = Math.floor(Math.random() * availableJokes.length);
  const selectedJoke = availableJokes[randomIndex];
  usedJokes.add(selectedJoke.id);

  // If all jokes have been used, reset the used jokes tracker
  if (usedJokes.size === jokes.length) {
    usedJokes.clear();
  }

  return selectedJoke;
};

export const addJoke = (joke: Omit<Joke, "id" | "isUserGenerated">) => {
  const id = (jokes.length + 1).toString();
  jokes.push({ ...joke, id, isUserGenerated: true });
};

export const getAllJokes = (): Joke[] => jokes;

export const deleteJoke = (id: string) => {
  jokes = jokes.filter((joke) => joke.id !== id);
  usedJokes.delete(id);
};