const User = require("../Models/UserSchema");
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRETE_KEY = process.env.JWT_SECRETE_KEY || "rolexbhai123";

// -------------------registration process-----------
const register = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password, photo } = req.body;
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const newUser = new User({
      name,
      email,
      photo,
      password: hashedPassword,
    });
    await newUser.save(); // Save the user to the database

    // Send a success message with the created user details (excluding the password)
    res.status(201).json({
      message: "User created successfully",
      newUser: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        photo: newUser.photo,
        role: newUser.role,
      },
    });
  } catch (error) {
    // Handle any errors
    console.error("Error in registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




// -------------------login processs-------------
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Compare the provided password with the stored hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid password" });
  }

  // Password matches, create a JWT token
  const token = jwt.sign(
    { userId: user._id.toString() },
    process.env.JWT_SECRETE_KEY,
    {
      expiresIn: "4h", // Token expiration time
    }
  );
  // Set the token as a cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(Date.now() + 1000 * 86400),
    // Cookie expires in 1 day
  });

  // Password matches, successful login
  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    userID: user._id,
  });
});



//--------------------logout user-------------
const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
});



// change password functioality password
const changePassword = asyncHandler(async (req, res, next) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    // find user by ID
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    // Compare the provided old password with the stored hashed password
    const passwordMatch = await bcrypt.compare(
      oldPassword,
      existingUser.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid old password" });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password with the new hashed password
    existingUser.password = hashedNewPassword;
    await existingUser.save(); // Save the updated user to the database

    // Send a success message
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



//  reset or forget password  logic
const forgetpassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found in this email" });
    }
    const resetToken = jwt.sign(
      { id: existingUser._id.toString() },
      process.env.JWT_SECRETE_KEY,
      {
        expiresIn: "4h", // Token expiration time
      }
    );

    // Set up Node Mailer transport
    const transporter = nodemailer.createTransport({
      // Specify your email service details (SMTP or other service)
      service: "gmail",
      auth: {
        user: "sahanirakesh877@gmail.com",
        pass: "pnvh gmbs hzrd wdzc",
      },
    });
    // Compose email message
    const mailOptions = {
      from: "sahanirakesh877@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text: ` http://localhost:5173/resetpassword/${existingUser._id}/${resetToken}`,
      html: `
      <h1>Password Reset Request</h1>
      <p>Hello ${existingUser.name},</p>
      <p>You have requested a password reset. Please click the following link to reset your password:</p>
      <a href="http://localhost:5173/resetpassword/${existingUser._id}/${resetToken}">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `,
     
    };
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Email could not be sent" });
      }
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .json({ message: "Password reset link sent successfully" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { id, resetToken } = req.params;
    const { password } = req.body;

    // Verify the reset token
    jwt.verify(resetToken, process.env.JWT_SECRETE_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      // Find the user by ID from the decoded token
      const user = await User.findByIdAndUpdate(decoded.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Hash the new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      // Send success response
      res.status(200).json({ message: "Password reset successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




//------------------------- get  user details   ------------------------------------r
const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ---------------------update user--------------------
const updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user fields based on request body
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    // Save the updated user
    const updatedUser = await user.save();

    // Return success response with updated user
    res
      .status(200)
      .json({
        success: true,
        message: "User updated successfully",
        user: updatedUser,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = {
  register,
  login,
  logout,
  getUser,
  changePassword,
  resetPassword,
  forgetpassword,
  updateUser,
};
