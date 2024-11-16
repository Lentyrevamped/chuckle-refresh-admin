import { useState } from "react";
import { Link } from "react-router-dom";
import { AdminLogin } from "@/components/AdminLogin";
import { Button } from "@/components/ui/button";
import { UserManagement } from "@/components/admin/UserManagement";
import { JokeManagement } from "@/components/admin/JokeManagement";
import { Shield, ArrowLeft } from "lucide-react";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

  if (!isLoggedIn) {
    return <AdminLogin onLogin={(username) => {
      setIsLoggedIn(true);
      setLoggedInUser(username);
    }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="fixed top-4 left-4 z-10">
        <Link to="/">
          <Button variant="ghost" className="button-hover flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Return to Main Site
          </Button>
        </Link>
      </div>

      <div className="container max-w-4xl py-12 space-y-8 animate-fade-up">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {loggedInUser}! Manage your jokes and users here.
          </p>
        </div>

        {loggedInUser === "Lenty" && <UserManagement loggedInUser={loggedInUser} />}
        <JokeManagement />
      </div>
    </div>
  );
};

export default Admin;