import express from "express";
import cors from "cors";
import morgan from "morgan";
import tweetsRouter from './router/tweets.js';
import authRouter from "./router/auth.js"
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
import { connectDB } from "./db/database.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny')); // 사용자가 들어오면 로그를 찍어줌

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

app.use((req, res) => {
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
});

connectDB().then(db => {
    const server = app.listen(config.host.port);
    initSocket(server);
}).catch(console.error);

// db.getConnection()
//     .then((Connection) => console.log(Connection));

// const server = app.listen(config.host.port);
// initSocket(server);