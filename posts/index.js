const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 4000;

const posts = {};

app.get("/post", (req, res) => {
  res.json(posts);
});

app.post("/post", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });
  res.status(201).json(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Receved Event", req.body.type);
  res.send({});
});

app.listen(port, () => {
  console.log("v55");
  console.log(`Server listening at ${port}`);
});
