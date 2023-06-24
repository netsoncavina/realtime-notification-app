import "./App.css";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Navbar } from "./components/navbar/Navbar";
import { Card } from "./components/card/Card";
import { posts } from "./data";
function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:3000"));
    console.log(socket);
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

  // console.log(user);
  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => {
            return (
              <Card key={post.id} post={post} socket={socket} user={user} />
            );
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
