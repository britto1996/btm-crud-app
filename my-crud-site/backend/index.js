const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./Config/db");
require("dotenv").config();
const port = process.env.PORT || 8000;
const userRoute = require("./Routers/userRoute");
const path = require("path");

app.use(express.json());
app.use(cors());

app.use("/api", userRoute);

//connect to db
connectDB();

app.use(express.static(path.resolve(__dirname, "./frontend/build")));

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
