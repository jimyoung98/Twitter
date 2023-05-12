import { config } from '../config.js';
import MongoDb from 'mongodb';

let db;
export async function connectDB(){
    return MongoDb.MongoClient.connect(config.db.host)
        .then((client) => {
            db = client.db()
        });
}

// 몽고디비는 스키마가 없음
// 비정형 형태, 규칙 따로 x

export function getUsers(){
    return db.collection('users');
}

export function getTweets(){
    return db.collection('Tweets');
}