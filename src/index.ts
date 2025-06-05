import redis from "./database/redis.js";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { User } from "./types.js";

const PORT = process.env.PORT || 4000;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV == "production"
        ? process.env.WEBSITE_URL
        : `http://localhost:3001`,
    methods: ["GET", "POST"]
  }
});

// io.use(async (socket: any, next: any) => {
//   try {
//     const token = socket.handshake.auth.token;

//     if (!token) {
//       return next(new Error("Authentication required"));
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as User;

//     socket.user = decoded;

//     socket.join(`user:${decoded.id}`);

//     next();
//   } catch (err) {
//     return next(new Error("Invalid authentication"));
//   }
// });

redis.on("message", (channel, message) => {
  if (channel == "shard_debug") {
    io.emit("shard_debug", message);
  }
});
redis.subscribe("shard_debug");

io.on("connection", (socket: any) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});
