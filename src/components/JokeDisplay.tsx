import { useState, useEffect } from "react";
import { JokeCard } from "@/components/JokeCard";
import { Button } from "@/components/ui/button";
import { getRandomJoke, type Joke } from "@/lib/jokes";
import { Link } from "react-router-dom";

export const JokeDisplay = () => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshJoke = async () => {
    setIsLoading(true);
    try {
      const newJoke = await getRandomJoke();
      setJoke(newJoke);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshJoke();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="fixed top-4 right-4">
        <Link to="/admin">
          <Button variant="ghost" className="button-hover">
            Admin Panel
          </Button>
        </Link>
      </div>
      
      <div className="space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Joke Generator</h1>
          <p className="text-muted-foreground">
            Click to reveal the punchline, then get a new joke!
          </p>
        </div>
        
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          joke && <JokeCard joke={joke} onRefresh={refreshJoke} />
        )}
      </div>
    </div>
  );
};