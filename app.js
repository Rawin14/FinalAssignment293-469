require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const requestIp = require('request-ip');
const connectDB = require("./server/config/db");
const session = require("express-session");


const app = express();
const PORT = 5000 || process.env.PORT;

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: 'Hello from Netlify Function!',
  };
};
// connect to database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "293-469",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {secure: false},
  })
);

app.use(requestIp.mw());

app.use(express.static("public"));
app.use(express.static("vendor"));
app.use(express.static("uploads"));

// tamplate engine

app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", require("./server/routes/main"));
app.get("/home", require("./server/routes/main"));
app.get("/types", require("./server/routes/main"));
app.get("/game", require("./server/routes/main"));
app.get("/forum", require("./server/routes/main"));
app.get("/write", require("./server/routes/main"));
app.get("/register", require("./server/routes/main"));
app.get("/login", require("./server/routes/main"));
app.get("/post/:id", require("./server/routes/main"));
app.get("/forum/type/:type", require("./server/routes/main"));
app.post("/write", require("./server/routes/login"));
app.get("/logout", require("./server/routes/login"));
app.post("/auth", require("./server/routes/login"));
app.post("/register", require("./server/routes/login"));
app.post("/post/:id/comment", require("./server/routes/main"));
app.get("/profile", require("./server/routes/main"));
app.post("/upload", require("./server/routes/main"));
app.get("/about", require("./server/routes/main"));
app.post("/forgot-password", require("./server/routes/login"));
app.post("/reset-password/:mail", require("./server/routes/login"));
app.get("/reset-password/:mail", require("./server/routes/login"));


app.listen(PORT ,'0.0.0.0',  () => {
  console.log(`Example app listening on port ${PORT}!`);
});
