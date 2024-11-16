import { useState, useEffect } from "react";
import { JokeCard } from "@/components/JokeCard";
import { Button } from "@/components/ui/button";
import { getRandomJoke, type Joke } from "@/lib/jokes";
import { Link } from "react-router-dom";
import { Laugh } from "lucide-react";

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
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-primary/10 text-primary animate-glow">
              <Laugh className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold gradient-text">
            Chuckle
          </h1>
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