import { supabase } from './supabase';

export interface Joke {
  id: string;
  setup: string;
  punchline: string;
  isUserGenerated?: boolean;
  display_order: number;
}

export const getRandomJoke = async (): Promise<Joke> => {
  const { data: jokes, error } = await supabase
    .from('jokes')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  if (!jokes || jokes.length === 0) {
    return {
      id: '1',
      setup: "Why did the scarecrow win an award?",
      punchline: "Because he was outstanding in his field!",
      display_order: 1
    };
  }

  // Instead of random selection, get the next joke in order
  const currentOrder = localStorage.getItem('currentJokeOrder');
  let nextIndex = 0;
  
  if (currentOrder) {
    const currentIndex = jokes.findIndex(joke => joke.display_order === parseInt(currentOrder));
    nextIndex = (currentIndex + 1) % jokes.length;
  }
  
  const nextJoke = jokes[nextIndex];
  localStorage.setItem('currentJokeOrder', nextJoke.display_order.toString());
  
  return nextJoke;
};

export const getAllJokes = async (): Promise<Joke[]> => {
  const { data: jokes, error } = await supabase
    .from('jokes')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  return jokes || [];
};

export const addJoke = async (joke: Omit<Joke, 'id' | 'display_order'>) => {
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
