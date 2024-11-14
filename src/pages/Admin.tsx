import { useState } from "react";
import { Link } from "react-router-dom";
import { AdminLogin } from "@/components/AdminLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addJoke, getAllJokes, deleteJoke, type Joke } from "@/lib/jokes";
import { addUser, getAllUsers } from "@/lib/users";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [setup, setSetup] = useState("");
  const [punchline, setPunchline] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isNewUserAdmin, setIsNewUserAdmin] = useState(false);
  const { toast } = useToast();
  const jokes = getAllJokes();
  const users = getAllUsers();

  const handleAddJoke = () => {
    if (setup && punchline) {
      addJoke({ setup, punchline });
      setSetup("");
      setPunchline("");
      toast({
        title: "Joke added successfully",
        description: "Your joke has been added to the collection",
      });
    }
  };

  const handleAddUser = () => {
    if (newUsername && newPassword) {
      try {
        addUser(newUsername, newPassword, isNewUserAdmin);
        setNewUsername("");
        setNewPassword("");
        setIsNewUserAdmin(false);
        toast({
          title: "User added successfully",
          description: `New ${isNewUserAdmin ? "admin" : "regular"} user created`,
        });
      } catch (error) {
        toast({
          title: "Error adding user",
          description: error instanceof Error ? error.message : "Unknown error occurred",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteJoke = (id: string) => {
    deleteJoke(id);
    toast({
      title: "Joke deleted",
      description: "The joke has been removed from the collection",
    });
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container max-w-4xl py-8 space-y-8 animate-fade-up">
        <div className="fixed top-4 left-4">
          <Link to="/">
            <Button variant="ghost" className="button-hover">
              Back to Main Site
            </Button>
          </Link>
        </div>

        <div className="glass-card p-8 rounded-xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Add New User</h2>
            <p className="text-muted-foreground">Create a new user account</p>
          </div>
          <div className="space-y-4">
            <Input
              placeholder="Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isAdmin"
                checked={isNewUserAdmin}
                onChange={(e) => setIsNewUserAdmin(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="isAdmin">Admin access</label>
            </div>
            <Button onClick={handleAddUser} className="w-full button-hover">
              Add User
            </Button>
          </div>
        </div>

        <div className="glass-card p-8 rounded-xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Add New Joke</h2>
            <p className="text-muted-foreground">Create a new joke to add to the collection</p>
          </div>
          <div className="space-y-4">
            <Input
              placeholder="Setup"
              value={setup}
              onChange={(e) => setSetup(e.target.value)}
            />
            <Input
              placeholder="Punchline"
              value={punchline}
              onChange={(e) => setPunchline(e.target.value)}
            />
            <Button onClick={handleAddJoke} className="w-full button-hover">
              Add Joke
            </Button>
          </div>
        </div>

        <div className="glass-card p-8 rounded-xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Manage Users</h2>
            <p className="text-muted-foreground">View existing users</p>
          </div>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.username}
                className="p-4 bg-secondary rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{user.username}</p>
                  <span className="text-xs text-primary mt-1 block">
                    {user.isAdmin ? "Admin User" : "Regular User"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 rounded-xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Manage Jokes</h2>
            <p className="text-muted-foreground">View and delete existing jokes</p>
          </div>
          <div className="space-y-4">
            {jokes.map((joke: Joke) => (
              <div
                key={joke.id}
                className={`p-4 ${joke.isUserGenerated ? 'bg-primary/10' : 'bg-secondary'} rounded-lg flex justify-between items-center`}
              >
                <div>
                  <p className="font-medium">{joke.setup}</p>
                  <p className="text-sm text-muted-foreground">{joke.punchline}</p>
                  {joke.isUserGenerated && (
                    <span className="text-xs text-primary mt-1 block">Custom Joke</span>
                  )}
                </div>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteJoke(joke.id)}
                  className="button-hover"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;