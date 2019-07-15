const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/sum', (req, res) => {
    if(!req.query.a || !req.query.b){
        return res.status(400).send('Invalid request')
    }

    let numA = parseInt(req.query.a);
    let numB = parseInt(req.query.b);

    if(isNaN(numA) || isNaN(numB)){
        return res.status(400).send('Must be numbers')
    }

    let c = numA + numB;

    res.send(`The sum of a and b is ${c}`);

    //works upon testing
})

app.listen(8080, () => console.log("Server is running on 8080"));