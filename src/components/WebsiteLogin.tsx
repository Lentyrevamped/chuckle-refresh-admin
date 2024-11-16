import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { validateUser } from "@/lib/users";
import { Laugh, LogIn } from "lucide-react";

interface WebsiteLoginProps {
  onLogin: (username: string) => void;
}

export const WebsiteLogin = ({ onLogin }: WebsiteLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const { isValid } = await validateUser(username, password);
      if (isValid) {
        onLogin(username);
      } else {
        toast({
          title: "Invalid credentials",
          description: "Please check your username and password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while logging in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mb-12 text-center space-y-4">
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-primary/10 text-primary animate-glow">
            <Laugh className="w-12 h-12" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold gradient-text">
          Welcome to Chuckle
        </h1>
        <p className="text-lg text-gray-200 max-w-xl mx-auto font-medium">
          Your daily dose of laughter, delivered with style
        </p>
      </div>

      <div className="glass-card w-full max-w-md p-8 rounded-xl animate-fade-up">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Sign In</h2>
            <p className="text-gray-200 font-medium">
              Enter your credentials to access the joke generator
            </p>
          </div>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-secondary/50 border-secondary"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-secondary/50 border-secondary"
            />
            <Button 
              onClick={handleLogin} 
              className="w-full button-hover bg-gradient-to-r from-primary to-neon-pink"
              disabled={isLoading}
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};