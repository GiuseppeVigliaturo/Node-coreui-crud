const express = require('express');
const app = express();

require('dotenv').config();
// C R U D
const nocache = require('nocache')
const main = require('./routes/frames');
const port = process.env.PORT;
console.log(port);

//MIDDLEWARE
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const methodOverride = require('method-override');
//app.use(cookieParser());
app.set("view engine", "pug");
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

//file statici
app.use('/assets',express.static(__dirname + '/public/assets'));
//routes

app.use('/', main);
//ENVIRONMENT
// Environment-specific options
if (process.env.NODE_ENV === 'production') {
    app.use(nocache());
} else {
    var logger = require('morgan');
    app.use(logger('dev'));
}

app.listen(port, ()=> console.log(`listening on port ${port}`));