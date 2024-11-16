import { supabase } from './supabase';

interface User {
  username: string;
  password: string;
  isAdmin: boolean;
}

export const addUser = async (username: string, password: string, isAdmin: boolean) => {
  const { data: existingUser } = await supabase
    .from('users')
    .select()
    .eq('username', username)
    .single();

  if (existingUser) {
    throw new Error("Username already exists");
  }

  const { error } = await supabase
    .from('users')
    .insert([{ username, password, isadmin: isAdmin }]);

  if (error) throw error;
};

export const validateUser = async (username: string, password: string): Promise<{ isValid: boolean; isAdmin: boolean }> => {
  const { data: user } = await supabase
    .from('users')
    .select('isadmin')
    .eq('username', username)
    .eq('password', password)
    .single();

  return {
    isValid: !!user,
    isAdmin: user?.isadmin || false
  };
};

export const deleteUser = async (username: string, requestingUser: string) => {
  if (requestingUser !== "Lenty") {
    throw new Error("Only Lenty can modify users");
  }
  if (username === "Lenty") {
    throw new Error("Cannot delete the main admin account");
  }

  const { error } = await supabase
    .from('users')
    .delete()
    .eq('username', username);

  if (error) throw error;
};

export const changePassword = async (username: string, newPassword: string, requestingUser: string) => {
  if (requestingUser !== "Lenty") {
    throw new Error("Only Lenty can modify users");
  }

  const { error } = await supabase
    .from('users')
    .update({ password: newPassword })
    .eq('username', username);

  if (error) throw error;
};

export const getAllUsers = async (): Promise<User[]> => {
  const { data: users, error } = await supabase
    .from('users')
    .select('*');

  if (error) throw error;
  return users || [];
};