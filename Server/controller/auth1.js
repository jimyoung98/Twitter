import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import * as userRepository from '../data/auth.js';


// jwt(조트) 암호화 키
const jwtSecretKey = '*H!cO1FAV#bN62!^s^Z3!#CZSpq#wQF4';

// 2일동안 키를 사용할수 있다
const jwtExpiresInDays = '2d';

// 몇번 반복할거냐
const bcryptSaltRounds = '10';



export async function signup(req, res) {
    // req.body 데이터를 받아 회원가입 시키는 함수
    // 해당 아이디가 존재 한다면 409를 리턴
    // userRepository에 데이터를 저장 ( 비밀번호는 bcrypt를 사용하여 저장 )
    // JWT를 이용하여 사용자에게 json으로 전달
    const { username, password, name, email, url } = req.body;
    const found = await userRepository.findByUsername(username)
    if (found) {
        return res.status(409).json({ message: `${username}은 이미 가입되었습니다.` });
    }
    const hashed = await bcrypt.hash(password, bcryptSaltRounds)
    const userId = await userRepository.createUser({
        username,
        password: hashed,
        name,
        email,
        url
    })
    const token = createJwtToken(userId);


    res.status(201).json({ token, username });
}



export async function login(req, res) {
    // req.body 데이터를 받아 해당 아이디로 로그인 여부를 판단
    // 해당 아이디가 존지하지 않으면 "401"을 리턴
    // bcrypt를 이용ㅇ하여 비밀번호까지 모두 맞다면 해당 정보를 JWT를 이용하여 사용자에게 json으로 전달


    res.status(200).json(data);
}


export async function me(req, res, next) {


    res.status(200).json(data);
}

function createJwtToken(id) {
    return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays })
}