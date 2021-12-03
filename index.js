const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  cors = require("cors"),
  morgan = require("morgan"),
  parser = require("body-parser");

app.use(express.json());
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(morgan("dev"));
require("dotenv").config({ path: __dirname + "/.env" });
app.use(cors({ origin: "*" }));

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database Connected");
    },
    (err) => {
      console.log(err);
    }
  );

app.use("/api", require("./routes"));

app.listen(8000, () => {
  console.log("running");
});
