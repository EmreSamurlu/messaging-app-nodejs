const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");

const userRoutes = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

//mongo connection
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
  },
  () => console.log("Connected to MongoDB")
);

const app = express();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
