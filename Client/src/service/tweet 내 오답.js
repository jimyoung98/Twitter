export default class TweetService {
  

    // 네트워크를 통해 데이터 가져오기

    // fetch를 통해 /tweets?username=:username

    // return username
    // ? this.tweets.filter((tweet) => tweet.username === username)
    // : this.tweets;
    async fetchAPI(){
      return fetch(`/tweets`)
          .then((response) => response.json())
          .then((data) => data);

   }

  async getTweets(username) {
    this.fetchAPI().then((datas) => {
      console.log(datas.dataseries);
      return datas
    })
    return fetch(`/tweets?username=${username}`)
    .then(data => data.filter(tweet => tweet.username === username))
   
    // .then(data => ()=>{data.filter(tweet => tweet.username === username)})
    // .catch(console.error)
  
      // const response = await fetch(`localhost/tweets?username=:${username}`);
      // const data = await response;
      // this.tweets = data;
      // return username
      //   ? this.tweets.filter((tweet) => tweet.username === username)
      //   : this.tweets;
    }
  
  

  // async postTweet(text) {
  //   // fetch를 통해 /tweets post로 입력한 데이터를 전송
  //   // const tweet = {
  //   //   id: Date.now(),
  //   //   createdAt: new Date(),
  //   //   name: 'apple',
  //   //   username: '김사과',
  //   //   text,
  
  //   this.tweets.push(tweet);
  //   return tweet;
  // }
  async postTweet(text) {
    const tweet = {
      name: 'apple',
      username: '김사과',
      text,
    };

      const response = await fetch('/tweets');
  
      const data = await response;
      this.tweet.push(data);
      return data;
  
  }


  

  async deleteTweet(tweetId) {
    this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
  }

  async updateTweet(tweetId, text) {
    const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
    if (!tweet) {
      throw new Error('tweet not found!');
    }
    tweet.text = text;
    return tweet;
  }
}
