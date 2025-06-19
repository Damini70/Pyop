const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleUserSignup = async (req, res) => {
  const { name, email, password, contact_number, address } = req.body;

  // Validate input
  if (!name || !email || !password || !contact_number || !address) {
    return res
      .status(400)
      .json({ message: "All fields are required", status: false });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { contact_number }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", status: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create the user with the hashed password
    const result = await User.create({
      name,
      email,
      password: hashedPassword, // Store the hashed password
      contact_number,
      address,
    });

    return res.status(201).json({
      message: "User created successfully",
      data: result,
      status: true,
    });
  } catch (err) {
    console.error(err); // Use console.error for error logging
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required", status: false });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", status: false });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", status: false });
    }

    // Generate a token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Token expiration time
      }
    );

    // Successful login
    return res.status(200).json({
      message: "Login successful",
      status: true,
      token, // Send the token back to the client
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        contact_number: user.contact_number,
        address: user.address,
      },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};

module.exports = { handleUserSignup, handleUserLogin };
