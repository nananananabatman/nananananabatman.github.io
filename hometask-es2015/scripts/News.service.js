function getUrl(src) {
    return `https://newsapi.org/v2/top-headlines?` +
        `sources=${src}&` +
        `apiKey=ad6861683ef144d4bff3c2770a9841f2`;
}

class NewsService {
    static async getNewsData(src) {
        let data, request, response;

        request = new Request(getUrl(src)),
        response = await fetch(request),
        data = await response.json();

        return data.articles;
    }
}