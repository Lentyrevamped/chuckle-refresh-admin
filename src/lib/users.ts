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

export const deleteUser = (username: string, requestingUser: string) => {
  if (requestingUser !== "Lenty") {
    throw new Error("Only Lenty can modify users");
  }
  if (username === "Lenty") {
    throw new Error("Cannot delete the main admin account");
  }
  const index = users.findIndex(u => u.username === username);
  if (index === -1) {
    throw new Error("User not found");
  }
  users.splice(index, 1);
};

export const changePassword = (username: string, newPassword: string, requestingUser: string) => {
  if (requestingUser !== "Lenty") {
    throw new Error("Only Lenty can modify users");
  }
  const user = users.find(u => u.username === username);
  if (!user) {
    throw new Error("User not found");
  }
  user.password = newPassword;
};

export const getAllUsers = () => users;