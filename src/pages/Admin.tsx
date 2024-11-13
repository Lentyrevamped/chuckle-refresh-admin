import { useState } from "react";
import { Link } from "react-router-dom";
import { AdminLogin } from "@/components/AdminLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addJoke, getAllJokes, deleteJoke, type Joke } from "@/lib/jokes";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [setup, setSetup] = useState("");
  const [punchline, setPunchline] = useState("");
  const { toast } = useToast();
  const jokes = getAllJokes();

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
            <h2 className="text-2xl font-semibold tracking-tight">Manage Jokes</h2>
            <p className="text-muted-foreground">View and delete existing jokes</p>
          </div>
          <div className="space-y-4">
            {jokes.map((joke: Joke) => (
              <div
                key={joke.id}
                className="p-4 bg-secondary rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{joke.setup}</p>
                  <p className="text-sm text-muted-foreground">{joke.punchline}</p>
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