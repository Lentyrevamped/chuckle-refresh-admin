import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { validateUser } from "@/lib/users";

interface AdminLoginProps {
  onLogin: (username: string) => void;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const { isValid, isAdmin } = await validateUser(username, password);
      
      if (!isValid || !isAdmin) {
        toast({
          title: "Access Denied",
          description: "Only admin users can access this page",
          variant: "destructive",
        });
        return;
      }
      
      onLogin(username);
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card w-full max-w-md p-8 rounded-xl animate-fade-up">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Admin Login</h2>
            <p className="text-muted-foreground">Enter your admin credentials to continue</p>
          </div>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button 
              onClick={handleLogin} 
              className="w-full button-hover"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};