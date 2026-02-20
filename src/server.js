import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import { Server } from "socket.io";
// import initWebRTCSocket from "./sockets/webrtc.socket.js";
import express from "express";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));

app.get("/video-call", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/index.html"));
});


const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const allusers = {};

io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);

  socket.on("join-user", username => {
    allusers[username] = { id: socket.id };
    io.emit("joined", allusers);
  });

  socket.on("offer", ({ from, to, offer }) => {
    io.to(allusers[to].id).emit("offer", { from, to, offer });
  });

  socket.on("answer", ({ from, to, answer }) => {
    io.to(allusers[from].id).emit("answer", { from, to, answer });
  });

  socket.on("icecandidate", candidate => {
    socket.broadcast.emit("icecandidate", candidate);
  });

  socket.on("call-ended", ([from, to]) => {
    io.to(allusers[from].id).emit("call-ended");
    io.to(allusers[to].id).emit("call-ended");
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Backend + WebRTC running on http://localhost:${PORT}`);
});
