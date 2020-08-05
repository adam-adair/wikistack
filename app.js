const express = require('express');
const morgan = require('morgan');
const override = require('method-override');
const views = require('./views');
const { db } = require('./models');
const wikiRoutes = require('./routes/wiki')
const userRoutes = require('./routes/user')


const app = express();

db.authenticate().
then(() => {
  console.log('connected to the database');
})


db.initialSync(1);

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(override('X-HTTP-Method-Override'))

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    //res.send(views.main(''));
    res.redirect('/wiki')
})

app.use('/wiki', wikiRoutes);
app.use('/users', userRoutes);





app.listen(3000, () => {
    console.log('app is listening on port 3000');
})
