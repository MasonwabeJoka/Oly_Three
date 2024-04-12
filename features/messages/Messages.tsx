"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ChatEngine } from "react-chat-engine";
import "./Messages.scss";
import ChatFeed from "./components/ChatFeed";

const Messages = () => {
  const username = "Oly";
  const password = "12345678";
  const projectID = "6b34d262-e185-42dd-a069-562e2356eb84";
  const router = useRouter();

  useEffect(() => {
    // Simulating user authentication check
    if (!localStorage.getItem("username")) {
      // Navigate to login if not authenticated
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="container">
      <div className="wrapper">
        <ChatEngine
          height="100vh"
          projectID={projectID}
          userName={username}
          userSecret={password}
          renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
          renderChatSettings={(chatAppState) => {}}
        />
      </div>
    </div>
  );
};

export default Messages;
