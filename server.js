const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const volunteerRouter = require("./router/volumteerRouter.js");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = http.createServer(app);

app.use("/volun", volunteerRouter);

app.get("/", (req, res) => {
  res.send("hello World!");
  console.log("main");
});

server.listen(port, () => {
  console.log(`server is on... http://localhost:${port}`);
});
