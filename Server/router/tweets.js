import express from 'express';
import * as tweetController from '../controller/tweet.js';
import { body } from 'express-validator'
import { validate } from '../middleware/validator.js'
import { isAuth } from '../middleware/auth.js';



const router = express.Router();

const validateTweet = [
    body('text')
        .trim()
        .isLength({ min: 4 })
        .withMessage('text는 최소 4자 이상 입력하세요!'),
    validate
]
//GET
// / tweets?username=:username
router.get('/', isAuth, tweetController.getTweets);


//이따 나머지 부분 만들어봄

// GET
// /tweets/id=:id
router.get('/:id', isAuth, tweetController.getTweetsById);


// text가 4글자 이하인 경우 에러처리 post and put 에대해서 
// POST
// id: Date.now().toString()
router.post('/', isAuth, validateTweet, tweetController.postTweets);


// PUT
// text만 수정
router.put('/:id', isAuth, validateTweet, tweetController.putTweets);

// DELETE
router.delete('/:id', isAuth, tweetController.deleteTweets);


export default router;