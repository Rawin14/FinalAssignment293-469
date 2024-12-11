require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

const connectDB = require("./server/config/db");
const session = require("express-session");

const app = express();
const PORT = 5000 || process.env.PORT;

// connect to database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    //cookie: { maxAge: new Date(Date.now() + 3600000) }
  })
);

app.use(express.static("assets"));
app.use(express.static("vendor"));

// tamplate engine

app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", require("./server/routes/main"));
app.post("/auth", require("./server/routes/login"));
app.post("/register", require("./server/routes/login"));
app.get("/home", require("./server/routes/main"));
app.get("/types", require("./server/routes/main"));
app.get("/game", require("./server/routes/main"));
app.get("/forum", require("./server/routes/main"));
app.get("/write", require("./server/routes/main"));
app.get("/register", require("./server/routes/main"));
app.get("/login", require("./server/routes/main"));
app.get("/post/:id", require("./server/routes/main"));
app.post("/write", require("./server/routes/login"));



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
