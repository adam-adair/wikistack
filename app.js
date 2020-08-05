const express = require('express');
const morgan = require('morgan');
const override = require('method-override');
const views = require('./views');
const { db, initialSync } = require('./models');
const wiki = require('./routes/wiki')
const users = require('./routes/users')


const app = express();

db.authenticate().
then(() => {
  console.log('connected to the database');
})
initialSync();

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(override('X-HTTP-Method-Override'))

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send(views.main(''));
})

app.use('/wiki', wiki);
app.use('/user', user);





app.listen(3000, () => {
    console.log('app is listening on port 3000');
})
