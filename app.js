require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

//connectDB
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");
// routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

//error handler
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//middlwares
app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});
//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
