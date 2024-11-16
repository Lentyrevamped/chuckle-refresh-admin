import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addJoke, getAllJokes, deleteJoke, type Joke } from "@/lib/jokes";
import { Laugh, Plus, Trash2 } from "lucide-react";

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
    <div className="space-y-8">
      <div className="glass-card p-8 rounded-xl space-y-6 transform hover:scale-[1.01] transition-transform duration-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Laugh className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight">Add New Joke</h2>
          </div>
          <p className="text-muted-foreground">Create a new joke to add to the collection</p>
        </div>
        <div className="space-y-4">
          <Input
            placeholder="Setup"
            value={setup}
            onChange={(e) => setSetup(e.target.value)}
            className="bg-white/50"
          />
          <Input
            placeholder="Punchline"
            value={punchline}
            onChange={(e) => setPunchline(e.target.value)}
            className="bg-white/50"
          />
          <Button onClick={handleAddJoke} className="w-full button-hover">
            <Plus className="w-4 h-4 mr-2" />
            Add Joke
          </Button>
        </div>
      </div>

      <div className="glass-card p-8 rounded-xl space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Laugh className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight">Manage Jokes</h2>
          </div>
          <p className="text-muted-foreground">View and delete existing jokes</p>
        </div>
        <div className="space-y-4">
          {jokes.map((joke) => (
            <div
              key={joke.id}
              className={`p-6 ${joke.isUserGenerated ? 'bg-primary/5' : 'bg-secondary'} 
                rounded-lg flex justify-between items-start gap-4 transform hover:scale-[1.01] 
                transition-transform duration-200`}
            >
              <div className="space-y-2">
                <p className="font-medium text-lg">{joke.setup}</p>
                <p className="text-muted-foreground">{joke.punchline}</p>
                <div className="flex items-center gap-2">
                  {joke.isUserGenerated && (
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      Custom Joke
                    </span>
                  )}
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                    Order: {joke.display_order}
                  </span>
                </div>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDeleteJoke(joke.id)}
                className="button-hover shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};