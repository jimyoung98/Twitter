export default class HttpClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    async fetch(url, options) {
        const res = await fetch(`${this.baseURL}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        let data;
        try {
            data = await res.json();
        } catch (error) {
            console.error(error);
        }
        if (res.status > 299 || res.status < 200) {
            const messate = data && data.message ? data.message : '문제가 발생하였습니다! :담담한_얼굴:';
            throw new Error(messate);
        }
        return data;
    }
}