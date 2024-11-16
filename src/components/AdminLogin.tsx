import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { validateUser } from "@/lib/users";
import { Shield, LogIn } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <div className="glass-card w-full max-w-md p-8 rounded-xl animate-fade-up transform hover:scale-[1.01] transition-transform duration-200">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Shield className="w-6 h-6" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">Admin Login</h2>
            <p className="text-muted-foreground">Enter your admin credentials to continue</p>
          </div>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white/50"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/50"
            />
            <Button 
              onClick={handleLogin} 
              className="w-full button-hover"
              disabled={isLoading}
            >
              {isLoading ? (
                "Logging in..."
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};