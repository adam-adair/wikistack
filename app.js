const express = require('express');
const morgan = require('morgan');
const override = require('method-override');
const views = require('./views');

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(override('X-HTTP-Method-Override'))

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send(views.main(''));
})

app.listen(3000, () => {
    console.log('app is listening on port 3000');
})
