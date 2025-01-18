"use client";

import { useEffect, useState } from "react";

import { getUserAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import socket from "@/lib/socket";

const Chat = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    function onLogin(msg: string) {
      console.log(msg);
    }

    socket.on("connect", onConnect);
    socket.on("get user", onLogin);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("get user", onLogin);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div>
      <h1>Chat</h1>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <Button
        onClick={() => socket.emit("chat message", "chat message from client!")}
      >
        Send Message
      </Button>
      <Button onClick={() => getUserAction()}>Get Message</Button>
    </div>
  );
};

export default Chat;
