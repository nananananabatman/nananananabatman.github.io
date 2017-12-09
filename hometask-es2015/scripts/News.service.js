function getUrl(src) {
    return `https://newsapi.org/v2/top-headlines?` +
        `sources=${src}&` +
        `apiKey=ad6861683ef144d4bff3c2770a9841f2`;
}

export class NewsService {
    static async getNewsData(src) {
        let data, response, url;

        console.log('It is a News service!');

        url = getUrl(src);
        response = await fetch(url),
        data = await response.json();

        return data.articles;
    }
}
