const request = require('request');

const forcast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ef458b13f1254ec799377c4b4bfc5ed5&query=${lat},${long}&units=m`
    request({url, json: true}, (err, {body} = {}) => {
        if (err) {
            callback('Unable to connect to weather service!');
        } else if(body.error) {
            callback("Unable to find location");
        }
        const temperature = body.current.temperature;
        const feelsLike = body.current.feelslike
        callback(undefined, {temperature, feelsLike});
    })
}

module.exports = forcast;
