require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connectDb } = require("./config");
const app = express();
const vendorRoutes = require("./routes/vendor");
const userRoutes = require("./routes/user");
const createPartyRoutes=require("./routes/createYourParty")
const customPartyRoutes=require("./routes/customParty");
const pyopPartyRoutes=require("./routes/pyopParty");
const filterRoutes=require("./routes/filter")

const PORT = 4000;

connectDb("mongodb://127.0.0.1:27017/pyop-db").then(() => {
  console.log("pyop-database connected");
});
app.use(cors()); 

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/vendor", vendorRoutes);
app.use("/user", userRoutes);
app.use('/create-party', createPartyRoutes);
app.use('/custom-party', customPartyRoutes);
app.use('/pyop-party', pyopPartyRoutes);
app.use('/save-preferences',filterRoutes)
app.listen(PORT, () => {
  console.log("Server Started" + PORT);
});
