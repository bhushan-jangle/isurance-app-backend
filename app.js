const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const MONGO_CON = "add your mongodb url";

const connectToMongo = async () => {
  await mongoose.connect(MONGO_CON);
  return mongoose;
};

connectToMongo().then(async () => console.log("mongodb connection success..."));

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //optional

app.use(cors(corsOptions)); // Use this after the variable declaration

app.get("/ping", (req, res) => {
  return res.send({
    error: false,
    message: "Server is healthy",
  });
});

app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 8000;

app.listen(5000, () => {
  console.log("Server started listening on PORT : " + 5000);
});
