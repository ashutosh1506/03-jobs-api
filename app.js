require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const app = express();

//middlwares
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Jobs Api");
});

app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
