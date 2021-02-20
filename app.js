const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const path = require("path");
const mqtt = require("mqtt");

const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

const morgan = require("morgan");
const { use } = require("./routes/mainRoute");
app.use(morgan("dev"));

//env
require("dotenv").config();

// Passport Config
require("./config/passport")(passport);

// DB Config
const db = require("./config/key").MongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//static
app.get("/public", (req, res) => {
  res.sendFile(__dirname + "/public/coba.js");
});

// Bodyparser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Config Route
const mainRouter = require("./routes/mainRoute");
const userRouter = require("./routes/userRoute");
const { static } = require("express");

// MQTT Connection
const Broker_URL = process.env.BrokerURL;
const options = {
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
  port: 1883,
  keepalive: 60,
};

const client = mqtt.connect(Broker_URL, options);
const urlMqtt = process.env.MqttURL;

client.on("connect", function () {
  console.log(`Connect to Broker ${Broker_URL}`);
  client.subscribe(urlMqtt, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`Listen to the topic ${urlMqtt}`);
    }
  });
});

app.use("/", mainRouter);
app.use("/users", userRouter);

const format = require("./utils/formatting");

// Websocket Config
io.on("connection", (socket) => {
  console.log("a user connected");
  client.on("message", (topic, message) => {
    let dataBuff = message.toString();
    let dataR = JSON.parse(dataBuff);
    let {
      "m2m:rsp": {
        pc: {
          "m2m:cin": { con },
        },
      },
    } = dataR;
    console.log(dataR);
    let sensor = JSON.parse(con);
    socket.emit("messages", format(sensor));
  });
});

const PORT = process.env.PORT;

http.listen(PORT, console.log(`Server running on port ${PORT}`));
