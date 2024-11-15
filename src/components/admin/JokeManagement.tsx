import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addJoke, getAllJokes, deleteJoke, type Joke } from "@/lib/jokes";

export const JokeManagement = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [setup, setSetup] = useState("");
  const [punchline, setPunchline] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadJokes();
  }, []);

  const loadJokes = async () => {
    try {
      const fetchedJokes = await getAllJokes();
      setJokes(fetchedJokes);
    } catch (error) {
      toast({
        title: "Error loading jokes",
        description: "Failed to load jokes",
        variant: "destructive",
      });
    }
  };

  const handleAddJoke = async () => {
    if (setup && punchline) {
      try {
        await addJoke({ setup, punchline });
        setSetup("");
        setPunchline("");
        await loadJokes();
        toast({
          title: "Joke added successfully",
          description: "Your joke has been added to the collection",
        });
      } catch (error) {
        toast({
          title: "Error adding joke",
          description: "Failed to add joke",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteJoke = async (id: string) => {
    try {
      await deleteJoke(id);
      await loadJokes();
      toast({
        title: "Joke deleted",
        description: "The joke has been removed from the collection",
      });
    } catch (error) {
      toast({
        title: "Error deleting joke",
        description: "Failed to delete joke",
        variant: "destructive",
      });
    }
  };

  return (
    <>
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
          {jokes.map((joke) => (
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
    </>
  );
};