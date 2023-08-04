const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('common'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log("I love dogs!")
    next();
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget'){
        next();
    }
    res.send('Error: Invalid password')
}

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('home');
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('woof');
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('I have no idea if I am an introvert or extrovert');
})

app.use((req, res) => {
    res.status(404).send('Error: not found')
})

app.listen(3000, () => {
    console.log('app is running');
})