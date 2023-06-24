import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});
console.log("socket server started");

let onlineUsers = [];

const addNewUser = (userName, socketId) => {
  !onlineUsers.some((user) => user.userName === userName) &&
    onlineUsers.push({ userName, socketId });
};

const deleteUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userName) => {
  return onlineUsers.find((user) => user.userName === userName);
};

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("newUser", (userName) => {
    addNewUser(userName, socket.id);
    console.log(onlineUsers);
    // io.emit("getUsers", onlineUsers);
  });

  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    console.log(senderName, receiverName, type);
    console.log(receiver);
    io.to(receiver.socketId).emit("getNotification", { senderName, type });
  });

  socket.on("disconnect", () => {
    deleteUser(socket.id);
    console.log("user disconnected");
  });
});

io.listen(3000);
