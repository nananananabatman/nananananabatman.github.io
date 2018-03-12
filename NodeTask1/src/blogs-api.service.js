export default class blogService {
    static async sendRequest(request) {
        const response = await fetch(request.url, {
            method: request.method,
            body: request.body,
            headers: {"Content-Type": "application/json"}
        });
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    }
}
