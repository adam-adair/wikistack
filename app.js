const express = require('express');
const morgan = require('morgan');
const override = require('method-override');

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(override('X-HTTP-Method-Override'))

app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(3000, () => {
    console.log('app is listening on port 3000');
})
