interface User {
  username: string;
  password: string;
  isAdmin: boolean;
}

let users: User[] = [
  { username: "Lenty", password: "CTDL0417", isAdmin: true }
];

export const addUser = (username: string, password: string, isAdmin: boolean) => {
  if (users.some(user => user.username === username)) {
    throw new Error("Username already exists");
  }
  users.push({ username, password, isAdmin });
};

export const validateUser = (username: string, password: string): { isValid: boolean; isAdmin: boolean } => {
  const user = users.find(u => u.username === username && u.password === password);
  return {
    isValid: !!user,
    isAdmin: user?.isAdmin || false
  };
};

export const getAllUsers = () => users;