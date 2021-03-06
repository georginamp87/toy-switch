// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
hbs.registerPartials(__dirname + '/views/partials')

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

// default value for title local
const projectName = "ToySwitch";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}`;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose')

app.use(session({
    secret: 'NotMyAge',
    saveUninitialized: false, 
    resave: false, 
    cookie: {
      maxAge: 1000*60*60*24*7// is in milliseconds.  expiring in 1 week
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60*60*24*7, // is in seconds. expiring in 1 week
    })
}));
// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const authRoutes = require('./routes/auth.routes')
app.use('/', authRoutes)

const homeRoutes = require('./routes/home.routes')
app.use('/', homeRoutes)

const profileRoutes = require('./routes/profile.routes')
app.use('/', profileRoutes)

const toyRoutes = require('./routes/toy.routes')
app.use('/', toyRoutes)

const messageRoutes = require('./routes/message.routes')
app.use('/', messageRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
