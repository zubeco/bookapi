const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connectToDatabase, connection } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const bookIdRoutes = require("./routes/bookIdRoute");
const popularRoute = require("./routes/popularRoute");
const cartRoute = require("./routes/cartRoute");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRoutes);

app.use("/books", bookRoutes);

app.use("/book", bookIdRoutes);

app.use("/books", popularRoute);

app.use("/cart", cartRoute);

const PORT_NO = process.env.PORT;

connectToDatabase()
  .then(() => {
    console.log(`Server started on port ${PORT_NO}`);
    app.listen(PORT_NO);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
