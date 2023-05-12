import MongoDb from 'mongodb';
import { getTweets } from '../db/database.js';
import * as UserRepository from './auth.js';
const ObjectID = MongoDb.ObjectId;
export async function getAll() {
    // const tweets = await getTweets().find().toArray();
    // return tweets.map(mapOptionalTweet);
    return getTweets()
        .find()
        .sort({ createdAt: -1 })
        .toArray()
        .then(mapTweets);
};
export async function getAllByUsername(username) {
    // const tweets = await getTweets().find({ username }).toArray();
    // return tweets.map(mapOptionalTweet);
    return getTweets().find({ username }).sort({ createdAt: -1 }).toArray()
        .then(mapTweets);
}
export async function getById(id) {
    // const tweet = await getTweets(id).findOne({ _id: ObjectID.id });
    // return mapOptionalTweet(tweet);
    return getTweets()
        .find({ _id: new ObjectID(id) })
        .next()
        .then(mapOptionalTweet);
}
// export async function getById(id) {
//     return Tweet.findByPk(id)
//         .then((data) => data ? data.dataValues : 'no data')
// }
export async function create(text, userId) {
    return UserRepository.findById(userId)
        .then((user) => getTweets().insertOne({
            text,
            createAt: new Date(),
            userId,
            name: user.name,
            username: user.username,
            url: user.url
        }))
        .then((res) => console.log(res))
        .then(mapOptionalTweet);
}
export async function update(id, text) {
    // return Tweet.findByPk(id, INCLUDE_USER)
    //     .then((tweet) => {
    //         tweet.text = text;
    //         return tweet.save();
    //     });
    return getTweets().findOneAndUpdate(
        { _id: new ObjectID(id) },
        { $set: { text } },
        { returnOriginal: false }
    )
        .then((result) => result.value)
        .then(mapOptionalTweet);
}
export async function remove(id) {
    // return Tweet.findByPk(id)
    //     .then((tweet) => {
    //         tweet.destroy();
    //     })
    return getTweets().deleteOne({ _id: new ObjectID(id) });
}
function mapOptionalTweet(tweet) {
    return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}
function mapTweets(tweets) {
    return tweets.map(mapOptionalTweet)
}