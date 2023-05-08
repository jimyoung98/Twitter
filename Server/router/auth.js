// /**
//  * 회원가입 -> post, /signup
//  * name: 빈문자x (notEmpty())
//  * email: 이메일 형식 체크, 모두 소문자
//  * url: url체크(isURL())
//  * 
//  * 로그인 -> post, /login
//  * username: 공백,빈문자x
//  * password: 공백,빈문자x(최소4자 이상)
//  */


import express from 'express';
// import * as tweetController from '../controller/tweet.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();
const validateCredential = [
    body('username')
        .trim()
        .notEmpty()
        .isLength({ min: 4 })
        .withMessage('아이디는 최소 4자이상 입력하세요'),
    body('password')
        .trim()
        .isLength({ min: 4 })
        .withMessage('비밀번호는 최소 4자이상 입력하세요'),
    validate
];
const validateSignup = [
    ...validateCredential,
    body('name').notEmpty().withMessage('이름은 꼭 입력하세요'),
    body('email').isEmail().normalizeEmail().withMessage('이메일을 입력하세요'),
    body('url').isURL().withMessage('url을 입력하세요')
        .optional({ nullable: true, checkFalsy: true }),
    validate
]
router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateCredential, authController.login);
router.get('/me', isAuth, authController.me);
export default router;







// import express from 'express';
// import * as authController from '../controller/auth1.js'
// import { body } from 'express-validator';
// import { validate } from '../middleware/validator.js'
// // const app = express();

// // app.use(express.json());
// const router = express.Router();


// // // 오류 처리 함수
// // const validate = (req, res, next) => {
// //     const errors = validationResult(req);

// //     // 에러가 아니면 next()실행
// //     if (errors.isEmpty()) {
// //         return next()
// //     }
// //     return res.status(400).json({ message: errors.array() });
// // };

// const validateLogin = [
//     // name이 비어있다면
//     body('username').trim().notEmpty().isLength({ min: 5 }).withMessage('아이디는 최소5자 이상 입력해주세요'),
//     body('password').trim().notEmpty().isLength({ min: 5 }).withMessage('아이디는 최소5자 이상 입력해주세요'),
//     // 오류 처리
//     validate
// ]

// const validateSignup = [
//     ...validateLogin,
//     body('name').notEmpty().withMessage('이름은 꼭 입력하세요'),
//     body('email').isEmail().normalizeEmail().withMessage('이메일을 입력하세요'),
//     body('url').isURL().withMessage('url을 입력하세요')
//         // 빈 문자열 입력 가능      bull값으로 나타낼수 있는 모든것을 true, false로 나타냄
//         .optional({ nullable: true, checkFalsy: true }),
//     validate
// ]









// // 라우터 연결 해주기
// router.post('./signup', validateSignup, authController.signup)

// router.post('./login', validateLogin, authController.login)

// router.post('./me', authController.me)



// export default router;


// // 회원가입 만들기
// // app.post(
// //     // 유저스 경로에서
// //     '/signup',

// //     // 하나의 자리에 두개 이상을 넣을때는 리스트로!!
// //     [
// //         // isEmail 이메일 형식이 아니라면 메시지출력하는데 normalize 대소문자 정리후 처리
// //         body('email').isEmail().withMessage('이메일 형식을 확인해 주세요!').normalizeEmail(),

// //         // jobname이 비어있다면
// //         body('name').notEmpty(),

// //         //url 형식 체크
// //         body('url').isURL(),

// //         // 오류 처리
// //         validate
// //     ],
// //     (req, res) => {
// //         console.log(req.body);
// //         res.sendStatus(201);
// //     }
// // );

// // app.post(
// //     '/login',
// //     [
// //         body('username').isEmpty().isLength({ min: 1 }),

// //         body('password').isEmpty().isLength({ min: 4 }),
// //         validate
// //     ],
// //     (req, res) => {
// //         console.log(req.body);
// //         res.sendStatus(200);
// //     }
// // )

// // router.listen(8080);