import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/tasksRoutes.js";

const PORT = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/tasks", router);

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is listing on ${PORT}`);
  } else {
    console.log("Something went wrong");
  }
});
