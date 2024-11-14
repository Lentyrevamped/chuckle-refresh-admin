import { useState } from "react";
import { WebsiteLogin } from "@/components/WebsiteLogin";
import { JokeDisplay } from "@/components/JokeDisplay";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

  if (!isLoggedIn) {
    return <WebsiteLogin onLogin={(username) => {
      setIsLoggedIn(true);
      setLoggedInUser(username);
    }} />;
  }

  return <JokeDisplay />;
};

export default Index;