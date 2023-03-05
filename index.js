const express = require("express");
const { connectToDatabase, connection } = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRoutes);

connectToDatabase()
  .then(() => {
    console.log("Server started on port 3000");
    app.listen(3000);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
