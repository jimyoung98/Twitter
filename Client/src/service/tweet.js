

export default class TweetService {
    constructor(http, tokenStorage) {
        this.http = http;
        this.tokenStorage = tokenStorage;
    }
    // 네트워크를 통해 데이터 가져오기
    async getTweets(username) {
        const query = username ? `?username=${username}` : '';
        return this.http.fetch(`/tweets${query}`, {
            method: 'GET',
            headers: this.getHeaders()
        });
    }

    async postTweet(text,username,name) {
        return this.http.fetch(`/tweets`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ text, username: this.getTweets(username) , name: this.getTweets(name)}),
        })
    }

    async deleteTweet(tweetId) {
        return this.http.fetch(`/tweets/${tweetId}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        })
    }

    async updateTweet(tweetId, text) {
        return this.http.fetch(`/tweets/${tweetId}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({ text })
        });
    }

    getHeaders() {
        const token = this.tokenStorage.getToken();
        return {
            Authorization: `Bearer ${token}`
            
        }
    }
}
