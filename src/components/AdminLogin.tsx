import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = () => {
    if (password === "admin123") {
      onLogin();
    } else {
      toast({
        title: "Invalid password",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="glass-card w-full max-w-md p-8 rounded-xl animate-fade-up">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Admin Login</h2>
          <p className="text-muted-foreground">Enter the admin password to continue</p>
        </div>
        <div className="space-y-4">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} className="w-full button-hover">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};