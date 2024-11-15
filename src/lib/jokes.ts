import { supabase } from './supabase';

export interface Joke {
  id: string;
  setup: string;
  punchline: string;
  isUserGenerated?: boolean;
}

export const getRandomJoke = async (): Promise<Joke> => {
  const { data: jokes, error } = await supabase
    .from('jokes')
    .select('*');

  if (error) throw error;
  if (!jokes || jokes.length === 0) {
    return {
      id: '1',
      setup: "Why did the scarecrow win an award?",
      punchline: "Because he was outstanding in his field!"
    };
  }

  const randomIndex = Math.floor(Math.random() * jokes.length);
  return jokes[randomIndex];
};

export const getAllJokes = async (): Promise<Joke[]> => {
  const { data: jokes, error } = await supabase
    .from('jokes')
    .select('*');

  if (error) throw error;
  return jokes || [];
};

export const addJoke = async (joke: Omit<Joke, 'id'>) => {
  const { error } = await supabase
    .from('jokes')
    .insert([joke]);

  if (error) throw error;
};

export const deleteJoke = async (id: string) => {
  const { error } = await supabase
    .from('jokes')
    .delete()
    .eq('id', id);

  if (error) throw error;
};