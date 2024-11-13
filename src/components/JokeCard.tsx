import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Joke } from "@/lib/jokes";

interface JokeCardProps {
  joke: Joke;
  onRefresh: () => void;
}

export const JokeCard = ({ joke, onRefresh }: JokeCardProps) => {
  const [showPunchline, setShowPunchline] = useState(false);

  return (
    <div className="glass-card w-full max-w-lg p-8 rounded-xl animate-fade-up">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="inline-block bg-primary/10 px-3 py-1 rounded-full">
            <span className="text-primary text-sm font-medium">Setup</span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">{joke.setup}</h2>
        </div>

        {showPunchline ? (
          <div className="space-y-2 animate-fade-in">
            <div className="inline-block bg-secondary px-3 py-1 rounded-full">
              <span className="text-secondary-foreground text-sm font-medium">
                Punchline
              </span>
            </div>
            <p className="text-xl text-foreground/80">{joke.punchline}</p>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={() => setShowPunchline(true)}
            className="button-hover"
          >
            Reveal Punchline
          </Button>
        )}

        <Button
          onClick={() => {
            setShowPunchline(false);
            onRefresh();
          }}
          className="w-full button-hover"
        >
          Next Joke
        </Button>
      </div>
    </div>
  );
};