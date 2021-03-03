const request = require('request');

const geoCode = (address, callback) => {
    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmFkYXZsZXYiLCJhIjoiY2tsODZoMmtwMnpjdTJubXNpbmN5cWs4eCJ9.uw78BQPZOebBNaDbhCF_KA`
    request({url, json: true}, (err, {body} = {}) => {
        if (err) {
            callback(err, undefined);
        }
        else if(!body.features.length) {
            callback('No Locations found', undefined);
        }
        const long = body.features[0].center[0];
        const lat = body.features[0].center[1];
        const placeName = body.features[0].place_name;
        callback(undefined, {lat, long, placeName});
    })
}

module.exports = geoCode;
