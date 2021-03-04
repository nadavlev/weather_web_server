const request = require('request');

const forcast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ef458b13f1254ec799377c4b4bfc5ed5&query=${lat},${long}&units=m`
    request({url, json: true}, (err, {body} = {}) => {
        if (err) {
            callback('Unable to connect to weather service!');
        } else if(body.error) {
            callback("Unable to find location");
        }
        console.log(body);
        const temperature = body.current.temperature;
        const feelsLike = body.current.feelslike
        const wind = body.current.wind_speed;
        const windDirection = body.current.wind_dir;
        const icon = body.current.weather_icons;
        const description = body.current.weather_descriptions;
        console.log(body);
        callback(undefined, {temperature, feelsLike, wind, windDirection, icon, description});
    })
}

module.exports = forcast;
