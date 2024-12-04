const express = require("express");
const dotenv = require("dotenv");
const taskRouter = require("./src/routes/task.routes");

const connectToDatabase = require("./src/database/mongoose.database");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/tasks", taskRouter);

connectToDatabase();

app.listen(8000, () => {
    console.log("Listening on port 8000!");
});
