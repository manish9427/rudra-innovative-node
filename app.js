require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

// Configure nodemailer to send emails
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Define routes for user authentication, CRUD operations, and "Forget Password"

// Authentication routes (`routes/auth.js`)
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// User management routes (`routes/users.js`)
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

// Forget Password route (`routes/forgetPassword.js`)
const forgetPasswordRoutes = require("./routes/forgetPassword");
app.use("/api/forgetpassword", forgetPasswordRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
