const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8080;
const expressLayouts = require("express-ejs-layouts");
const db_url = require("./config/mongoose");
// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
// for storing session - so that in server restarts we dont lose out
const MongoStore = require("connect-mongo");
// TODO : this "db" is empty because above require runs fast whereas export happens in an asynchronous request way
// db = db();
// console.log("db is :- ", db);
// console.log("db is :- ", typeof(db));
const sass = require("node-sass");
// const sassMiddle = require("node-")
app.use(sass.render)

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// app.use("/", require("./routes/index"));
// Default is index so we can only give the directory

app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session cookie in the database
app.use(session({
    name: "socialize",
    // TODO : change the secret before deployment in production
    secret: "randomText",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100) // 10 minutes
    },
    store: MongoStore.create({
            mongoUrl: db_url, 
            autoRemove: "disabled"
        },
        function(err){
            console.log(err);
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticationUser);

// use express router
app.use("/", require("./routes"));

app.listen(port, function(err){
    if(err){
        console.error(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
}); 