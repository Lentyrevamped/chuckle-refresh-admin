import { supabase } from './supabase';

export interface Joke {
  id: string;
  setup: string;
  punchline: string;
  isUserGenerated?: boolean;
}

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

let usedJokes = new Set<string>();

export const getRandomJoke = async (): Promise<Joke> => {
  const { data: jokes, error } = await supabase
    .from('jokes')
    .select('*');

  if (error) throw error;

  const availableJokes = (jokes || []).filter(joke => !usedJokes.has(joke.id));

  if (availableJokes.length === 0) {
    const newJoke = generateRandomJoke();
    const { data: insertedJoke, error: insertError } = await supabase
      .from('jokes')
      .insert([{ ...newJoke, isUserGenerated: false }])
      .select()
      .single();

    if (insertError) throw insertError;
    return insertedJoke;
  }

  const randomIndex = Math.floor(Math.random() * availableJokes.length);
  const selectedJoke = availableJokes[randomIndex];
  usedJokes.add(selectedJoke.id);

  if (usedJokes.size === jokes?.length) {
    usedJokes.clear();
  }

  return selectedJoke;
};

export const addJoke = async (joke: Omit<Joke, "id" | "isUserGenerated">) => {
  const { error } = await supabase
    .from('jokes')
    .insert([{ ...joke, isUserGenerated: true }]);

  if (error) throw error;
};

export const getAllJokes = async (): Promise<Joke[]> => {
  const { data: jokes, error } = await supabase
    .from('jokes')
    .select('*');

  if (error) throw error;
  return jokes || [];
};

export const deleteJoke = async (id: string) => {
  const { error } = await supabase
    .from('jokes')
    .delete()
    .eq('id', id);

  if (error) throw error;
  usedJokes.delete(id);
};