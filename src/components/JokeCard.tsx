import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Joke } from "@/lib/jokes";
import { Sparkles, ArrowRight } from "lucide-react";

interface JokeCardProps {
  joke: Joke;
  onRefresh: () => void;
}

export const JokeCard = ({ joke, onRefresh }: JokeCardProps) => {
  const [showPunchline, setShowPunchline] = useState(false);

  return (
    <div className="glass-card w-full max-w-lg p-8 rounded-xl animate-fade-up">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-primary">Setup</span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">{joke.setup}</h2>
        </div>

        {showPunchline ? (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-neon-pink/10 text-neon-pink">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-neon-pink">
                Punchline
              </span>
            </div>
            <p className="text-xl text-foreground/90">{joke.punchline}</p>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={() => setShowPunchline(true)}
            className="button-hover w-full bg-secondary/50 border-secondary"
          >
            Reveal Punchline
          </Button>
        )}

        <Button
          onClick={() => {
            setShowPunchline(false);
            onRefresh();
          }}
          className="w-full button-hover bg-gradient-to-r from-primary to-neon-pink"
        >
          Next Joke
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};