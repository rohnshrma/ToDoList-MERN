import express from "express";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

connectDB();

const PORT = process.env.PORT;

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use("/api/tasks", router);

app.listen(PORT, () => {
  console.log("server started on port:", PORT);
});
