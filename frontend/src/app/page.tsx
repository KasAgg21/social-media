'use client';

import Feed from "@/components/Feed";
import CreatePost from "@/components/CreatePost";
import { useContext, useState } from "react";
import AuthContext from "@/context/AuthContext";

export default function Home() {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated;
  const [refreshFeed, setRefreshFeed] = useState(false);

  const handlePostCreated = () => {
    setRefreshFeed((prev) => !prev);
  };

  return (
    <div>
      {isAuthenticated && <CreatePost onPostCreated={handlePostCreated} />}
      <Feed refresh={refreshFeed} />
    </div>
  );
} 