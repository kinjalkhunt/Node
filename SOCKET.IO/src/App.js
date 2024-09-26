
import express from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";
import http from "http";
import { v4 as uuid} from "uuid";  // Import the v4 function
import cors from "cors";
// import mongoose from 'mongoose'
import userRouter from "./Api/useApi.js";
import userModel from "./Model/userModel.js";
import chatModel from "./Model/chatModel.js";
import { timeStamp } from "console";

dotenv.config();

const apiInstance = express();
apiInstance.use(express.json());
apiInstance.use(express.urlencoded({ extended: true }));

apiInstance.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: "*",
    exposedHeaders: "*",
    preflightContinue: true,
  })
);

apiInstance.use(userRouter);

const serverPort = process.env.server_port || 7000;
const server = http.createServer(apiInstance);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let connectedSocketUsersObj = {};

io.on("connection", (socket) => {
  console.log("User connected and id is === ", socket.id);

  socket.on('add_user', (newUser) => {
        // Add the user to your database or in-memory store
        // Emit the new user to all connected clients
        io.emit('new_user_added', newUser);
    });
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('chatMessage', ({ room, message }) => {
    io.to(room).emit('chatMessage', message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected == ", socket.id);
  });

  socket.on("register", async (doc) => {
    console.log("Register event");
    connectedSocketUsersObj[doc.userID] = socket.id;
    console.log(connectedSocketUsersObj);

    try {
      const data = await userModel.find();
      socket.emit("all_user_get", { data });

      const chatData = await chatModel.find({ senderID: doc.userID });
      socket.emit("chat-data", { chatData });
    } catch (error) {
      console.error("Error in register event:", error);
    }
  });

  socket.on("reduxconnected", (doc) => {
    console.log("Redux connected event ==", doc);
  });

  // const uniqueID = uuid();


  socket.on("drop_message", async (doc) => {
    console.log("Drop message doc == ", doc);

    const { senderID, receiverID, message } = doc;

    //validinput
    if (!senderID || !receiverID || !message) {
      console.log("Invalid Input: senderID, receiverID, message are required");
      return;
    }

    try {
      const chatData = await chatModel.find({
        $or: [
          { senderID: doc.senderID, receiverID: doc.receiverID },
          { senderID: doc.receiverID, receiverID: doc.senderID },
        ],
      });

      let prepareChatData;
      if (!chatData.length) {
        prepareChatData = new chatModel({
          chatID: uuid(),
          senderID: doc.senderID,
          receiverID: doc.receiverID,
          message: message,
          timeStamp: doc.time, // Add timestamp for when the message was sent

        });
      } else {
        prepareChatData = new chatModel({
          chatID: chatData[0].chatID,
          senderID: doc.senderID,
          receiverID: doc.receiverID,
          message: message,
          timestamp: doc.time,

        });
      }

      await prepareChatData.save();

      const user = connectedSocketUsersObj[doc.receiverID];
      if (user) {
        socket.to(user).emit("caught_message", prepareChatData);
      }
    } catch (error) {
      console.error("Error in drop_message event:", error);
    }
  });

  socket.on("get_users", async (doc) => {
    try {
      const { search } = doc;
      const regex = new RegExp(`^${search}`, "i");

      const data = await userModel.find({
        $or: [
          { name: { $regex: regex } },
          { email: { $regex: regex } },
        ],
      });

      console.log("Searched data === ", data);
      socket.emit("searched_value", { data });
    } catch (error) {
      console.error("Error in get_users event:", error);
    }
  });

  socket.on("jkl", (doc) => {
    console.log("Jkl log == ", doc);
  });
});

server.listen(serverPort, () => {
  console.log(`Server successfully connected at port no. ${serverPort}`);
});