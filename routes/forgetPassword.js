const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Configure nodemailer to send emails (you should replace these values)
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Forget Password - Send reset link to the user's email
router.post("/forget", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }

    // Generate a reset token (for simplicity, we're using a static token)
    const resetToken = process.env.RESET_TOKEN;

    // Send an email with the reset link
    const resetLink = `http://your-app-url/reset/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `To reset your password, click on the following link: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Reset Password - Update the user's password (token validation should be enhanced in production)
router.post("/reset/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // In a real application, you should validate the token and handle password updates securely
    if (token === process.env.RESET_TOKEN) {
      // Update the user's password with the new password
      // You need to implement this logic to update the password in your database

      res.status(200).json({ message: "Password reset successful" });
    } else {
      res.status(400).json({ error: "Invalid token" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
