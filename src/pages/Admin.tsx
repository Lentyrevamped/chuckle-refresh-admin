import { useState } from "react";
import { Link } from "react-router-dom";
import { AdminLogin } from "@/components/AdminLogin";
import { Button } from "@/components/ui/button";
import { UserManagement } from "@/components/admin/UserManagement";
import { JokeManagement } from "@/components/admin/JokeManagement";

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
    <div className="min-h-screen flex items-center justify-center">
      <div className="container max-w-4xl py-8 space-y-8 animate-fade-up">
        <div className="fixed top-4 left-4">
          <Link to="/">
            <Button variant="ghost" className="button-hover">
              Back to Main Site
            </Button>
          </Link>
        </div>

        {loggedInUser === "Lenty" && <UserManagement loggedInUser={loggedInUser} />}
        <JokeManagement />
      </div>
    </div>
  );
};

export default Admin;