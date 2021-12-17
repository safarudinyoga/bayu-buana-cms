const request = require('request').defaults({ encoding: null });

export default function imgBase64(url) {
    return new Promise((res, rej) => {
        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');
                res(data)
            }
        })
    });
}
