const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require("./utils/geoCode");
const forcast = require("./utils/forcast");


console.log(path.join(__dirname, '../public'))

const app = express();
const port = process.env.PORT || 3000;

// static paths
const pathToPublicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set up handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory
app.use(express.static(pathToPublicDirectory));

app.get('', (req, res) => {
    res.render('index', {title: "Dynamic title", name: "Nadav Lev"});
})

app.get('/about', (req, res) => {
    res.render('about', {title: "About", name: "Nadav"});
})

app.get('/help', (req, res) => {
    res.render('help', {title: "Help", name: "Nadav"});
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({error: "You must provide an address"});
    }

    geoCode(address, (error, {lat, long, placeName} = {}) => {
        console.log(`error: ${error}, lat: ${lat}, long: ${long}, placeName: ${placeName}`)
        if (error) {
            return res.send({error});
        }
        forcast(lat, long, (err, {temperature:temp, feelsLike:feels, wind, windDirection, icon, description} = {}) => {

            if (err) {
                return res.send({error: "Cant find forcast"});
            }

            return res.send({
                address: address,
                forecast: temp,
                feels: feels,
                location: placeName,
                wind,
                windDirection,
                icon,
                description
            });
        })
    })

})

app.get('/products', (req, res) => {
    console.log(req.query);
    const search = req.query.search;
    const rating = req.query.rating;
    if (!search) {
        return res.send({error: 'You must provide a search term'});
    }
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {title: "404", name:"Nadav Lev" , msg: "Help File not found - 404"});
})

app.get('*', (req, res) => {
    res.render('404', {title: "404", name:"Nadav Lev", msg: "File not found - 404"});
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
