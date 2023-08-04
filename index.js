const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('common'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('home');
})

app.get('/dogs', (req, res) => {
    res.send('woof');
})

app.listen(3000, () => {
    console.log('app is running');
})