import { useState, useEffect } from "react";
import { JokeCard } from "@/components/JokeCard";
import { Button } from "@/components/ui/button";
import { getRandomJoke } from "@/lib/jokes";
import { Link } from "react-router-dom";

const Index = () => {
  const [joke, setJoke] = useState(getRandomJoke());

  const refreshJoke = () => {
    setJoke(getRandomJoke());
  };

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
        
        <JokeCard joke={joke} onRefresh={refreshJoke} />
      </div>
    </div>
  );
};

export default Index;