import express from 'express';
import * as userRepository from './auth.js';
// import { db } from '../db/database.js'

let tweets = [
    {
        id: '1',
        text: '첫 트윗입니다!!',
        createdAT: Date.now().toString(),
        userId: '1'
    },
    {
        id: '2',
        text: '안녕하세요요!!',
        createdAT: Date.now().toString(),
        userId: '1'
    },
    {
        id: '3',
        text: '싱싱한 메론!!',
        createdAT: Date.now().toString(),
        userId: '1'
    }
];


const SELECT_JOIN = 'SELECT users.id, users.username, users.password, users.name, users.email, users.url, tweets.text, tweets.createAT, tweets.userid FROM users left outer JOIN tweets on users.id = tweets.userid';

const ORDER_DESC = 'ORDER By tweets.createAT desc';

// select 해올때 테이블이 다르기때문에 join해서 가져와야함

export async function getAll() {
    // return Promise.all(
    //     tweets.map(async (tweet) => {
    //         const { username, name, url } = await userRepository.findById(tweet.userId);
    //         return { ...tweet, username, name, url };
    //     })
    // )
    return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
}

export async function getAllbyUsername(username) {
    // return getAll()
    //     .then((tweets => tweets.filter((tweet) => tweet.username === username)));
    return db.execute(`${SELECT_JOIN} where users.username = ? ${ORDER_DESC} ; `, [username]).then((result) => result[0]);
}


export async function getTweetsById(id) {
    return db.execute(`${SELECT_JOIN} where tweets.id = ?; `, [id]).then((result) => result[0][0]).then((error) => {
        return console.log(error);
    });
    // return db.execute('SELECT users.id, users.username, users.password, users.name, users.email, users.url, tweets.text, tweets.createAT, tweets.userid FROM users left outer JOIN tweets on users.id = tweets.userid where tweets.id = ?', [id]).then((result) => result[0][0]);
}



export async function create(text, userId) {
    // const tweet = {
    //     id: Date.now().toString(),
    //     text,
    //     createdAT: new Date(),
    //     userId
    // };
    // tweets = [tweet, ...tweets];
    // return getTweetsById(tweet.id)
    return db.execute('insert into tweets (text, createAT, userId) values (?, ?, ?)', [text, new Date(), userId])
        .then((result) => console.log(result))
}

export async function update(id, text) {
    // const tweet = tweets.find((tweet) => tweet.id === id);
    // if (tweet) {
    //     tweet.text = text;
    // }
    // return tweet
    return db.execute('update tweets SET text=? where tweet.id=?', [text, id]
        .then(() => getTweetsById(id)));
}

export async function remove(id) {
    // tweets = tweets.filter((tweet) => tweet.id !== id);
    return db.execute('delete from tweets where userid=?', [id]);
}