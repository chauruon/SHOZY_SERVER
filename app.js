var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
require("dotenv").config();

var all_routes = require('./routes/index');
var app = express();

const { networkInterfaces } = require('os');


const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
			console.log(results[name]);
        }
    }
}

mongoose.connect(process.env.DB_ACCESS_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => console.log("Connected successfully to server!"))
.catch((err) => console.log("DB error", err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/',all_routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get("env") === "development" ? err : {};

// render the error page
res.status(err.status || 500);
res.render("error");
});

module.exports = app;
