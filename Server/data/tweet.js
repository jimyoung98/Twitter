import express from 'express';
import * as userRepository from '../data/auth.js';
import { db } from '../db/database.js'

// let tweets = [
//     {
//         id: '1',
//         text: '첫 트윗입니다!!',
//         createdAT: Date.now().toString(),
//         userId: '1'
//     },
//     {
//         id: '2',
//         text: '안녕하세요요!!',
//         createdAT: Date.now().toString(),
//         userId: '1'
//     },
//     {
//         id: '3',
//         text: '안녕하세요요!!',
//         createdAT: Date.now().toString(),
//         userId: '1'
//     }

// ];


// export async function getAll() {
//     return Promise.all(
//         tweets.map(async (tweet) =>{
//             const {username, name, url} = await userRepository.findById(tweet.userId);
//             return {...tweet,username,name,url};
//         })
//     )

// }

// export async function getAllbyUsername(username){
//     return getAll().then((tweet) => tweet.filter(tweet.username === username));
// }


// export async function getTweetsById(id){
//     const found = tweets.find((tweet) => tweet.id === id);
//     if(!found){
//         return null;
//     }
//     const {username,name,url} = await userRepository.findById(found.userId)
//     return {...found,username,name,url};
// }

// export async function create(text,userId){
//     const tweet = {
//         id: Date.now().toString(),
//         text,
//         createdAT: new Date(),
//         userId
//     };
//     tweets = [tweet, ...tweets];
//     return getTweetsById(tweet.id)

// }

// export async function update(id, text) {
//     const tweet = tweets.find((tweet) => tweet.id === id);
//     if(tweet){
//         tweet.text = text;
//     }
//     return tweet
// }

// export async function remove(id) {
//     tweets = tweets.filter((tweet) => tweet.id !== id);
// }


// -------------------------------------------------------------------


// export async function getAll() {
//     const tweets = await db.execute(
//         `
//         SELECT tweets.*, users.username, users.name, users.url
//         FROM tweets
//         JOIN users ON tweets.userid = users.id
//         ORDER BY tweets.createdAT DESC
//       `
//     );

//     return tweets[0];
// }

// export async function getAllbyUsername(username) {
//     const tweets = await db.execute(
//         `
//         SELECT tweets.*, users.username, users.name, users.url
//         FROM tweets
//         JOIN users ON tweets.userid = users.id
//         WHERE users.username = ?
//         ORDER BY tweets.createdAT DESC
//       `,
//         [username]
//     );

//     return tweets[0];
// }

// export async function getTweetsById(id) {
//     const tweets = await db.execute(
//         `
//         SELECT tweets.*, users.username, users.name, users.url
//         FROM tweets
//         JOIN users ON tweets.userid = users.id
//         WHERE tweets.userid = ?
//       `,
//         [id]
//     );

//     return tweets[0][0];
// }

// export async function create(text, userId) {
//     const createdAt = new Date();
//     const result = await db.execute(
//         `
//         INSERT INTO tweets (text, createdAT, userid)
//         VALUES (?, ?, ?)
//       `,
//         [text, createdAt, userId]
//     );

//     const tweetId = result[0].insertId;
//     const tweet = await getTweetsById(tweetId);
//     return tweet;
// }

// export async function update(id, text) {
//     await db.execute(
//         `
//         UPDATE tweets
//         SET text = ?
//         WHERE id = ?
//       `,
//         [text, id]
//     );

//     return getTweetsById(id);
// }

// export async function remove(id) {
//     await db.execute(
//         `
//         DELETE FROM tweets
//         WHERE id = ?
//       `,
//         [id]
//     );
// }

// -------------------------------------------------------------------
const SELECT_JOIN = 'SELECT users.id, users.username, users.password, users.name, users.email, users.url, tweets.id, tweets.text, tweets.createdAT, tweets.userid FROM users  left JOIN tweets on users.id = tweets.userid';

const ORDER_DESC = 'order by tweets.createdAt DESC';

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
    return db.execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`,[username]).then((result) => result[0]);
}

export async function getTweetsById(id) {
    // const found = tweets.find((tweet) => tweet.id === id);
    // if (!found) {
    //     return null;
    // }
    // const { username, name, url } = await userRepository.findById(found.userId)
    // return { ...found, username, name, url };
    const a = `${SELECT_JOIN} WHERE tweets.id = ${id} ${ORDER_DESC}`;
    console.log(a);

    return db.execute(` ${SELECT_JOIN} where tweets.id = ?  `, [id]).then((result) => result[0]);

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
    return db.execute('insert into tweets (text, createdAT, userId) values (?, ?, ?)', [text, new Date(), userId])
        .then((result) => console.log(result))
}
export async function update(id, text) {
    return db.execute(`update tweets SET text =? where id=?`,[text,id]).then(() => getTweetsById(id));
}
export async function remove(id) {
    return db.execute(`delete from tweets where id=?`,[id])
}