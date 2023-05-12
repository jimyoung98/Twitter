import { getUsers } from '../db/database.js';
import MongoDb from 'mongodb';

const ObjectID = MongoDb.ObjectId; // rDBMS에서는 pk와 같음, 랜덤문자 발행

export async function findByUsername(username) {
    return getUsers()
        .find({username})
        .next()
        .then(mapOptionalUser);
};

export async function createUser(user) {
    return getUsers()
        .insertOne(user)
        .then((res) => {
            console.log(res)});
};

export async function findById(id) {
    return getUsers()
        .find({_id: new ObjectID(id) })
        .next()
        .then(mapOptionalUser)
};

function mapOptionalUser(user){
    return user ? { ...user, id: user._id.toString() } : user;
}

// export async function findByUsername(username) {
//     return User.findOne({where: { username }});
// };

// export async function createUser(user) {
//     return User.create(user)
//         .then((data) => data.dataValues.id);
// };

// export async function findById(id) {
//     return User.findByPk(id);
// };