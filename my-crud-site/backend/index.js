const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./Config/db");
require("dotenv").config();
const port = process.env.PORT || 8000;
const userRoute = require("./Routers/userRoute");

app.use(express.json());
app.use(cors());

app.use("/api", userRoute);

//connect to db
connectDB();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
