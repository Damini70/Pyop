require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connectDb } = require("./config");
const app = express();
const vendorRoutes = require("./routes/vendor");
const userRoutes = require("./routes/user");
const PORT = 4000;

connectDb("mongodb://localhost:27017/pyop-db").then(() => {
  console.log("pyop-database connected");
});
app.use(cors()); // Enable CORS

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/vendor", vendorRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log("Server Started" + PORT);
});
