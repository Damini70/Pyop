require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const { connectDb } = require("./config");
const { handleMulterError } = require("./middlewares/multer");
const app = express();
const vendorRoutes = require("./routes/vendor");
const userRoutes = require("./routes/user");
const createPartyRoutes=require("./routes/createYourParty")
const customPartyRoutes=require("./routes/customParty");
const pyopPartyRoutes=require("./routes/pyopParty");
const filterRoutes=require("./routes/filter")

const PORT = 4000;

connectDb(process.env.MONGO_URI).then(() => {
  console.log("pyop-database connected");
});
app.use(cors()); 

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Multer error handling middleware
app.use(handleMulterError);

// General error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

app.use("/vendor", vendorRoutes);
app.use("/user", userRoutes);
app.use('/create-party', createPartyRoutes);
app.use('/custom-party', customPartyRoutes);
app.use('/pyop-party', pyopPartyRoutes);
app.use('/save-preferences',filterRoutes)
app.listen(PORT, () => {
  console.log("Server Started" + PORT);
});
