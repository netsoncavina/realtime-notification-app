import "./App.css";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Navbar } from "./components/navbar/Navbar";
import { Card } from "./components/card/Card";
import { posts } from "./data";
function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
    console.log(socket);
  }, []);

  // console.log(user);
  return (
    <div className="container">
      {user ? (
        <>
          <Navbar />
          {posts.map((post) => {
            return <Card post={post} />;
          })}
          <span className="username">{user}</span>
        </>
      ) : (
        <div className="login">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setUser(username)}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
