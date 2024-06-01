const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// CREATE USER {POST} /USER/CREATE
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    console.log(req.body);

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const newEmail = email.toLowerCase();
    const newUsername = username.toLowerCase();
    const emailExist = await User.findOne({ email: newEmail });

    if (emailExist) {
      return res.status(400).send({ message: "Email already exists" });
    }

    if (password.trim().length < 6) {
      return res
        .status(400)
        .send({ message: "Password must be at least 6 characters long" });
    }

    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username: newUsername,
      email: newEmail,
      password: hashedPassword,
    });

    res.status(201).json(`${newUser.email}, "User created successfully"`);
  } catch (error) {
    res.status(500).send({ message: "Error while creating user", error });
  }
};

//  LOGIN USER {POST} /USER/LOGIN

exports.loginUser = async (req, res) => {
  try {
    const { UsernameOrMail, password } = req.body;
    console.log("req.body: ", req.body);

    if (!UsernameOrMail || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const NewUsernameOrMail = UsernameOrMail.toLowerCase();

    const user = await User.findOne({
      $or: [{ email: NewUsernameOrMail }, { username: NewUsernameOrMail }],
    });

    if (!user) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const vaildPassword = await bcrypt.compare(password, user.password);

    if (!vaildPassword) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const { _id, username, email } = user;

    const token = jwt.sign({ _id, username }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ _id, username, email, token });
  } catch (error) {
    res.status(500).send({ message: "Error while logging in user", error });
  }
};

// EDIT USER {PATCH} /USER/MANAGE

exports.manageUser = async (req, res) => {
  try {
    const { username, email, newPassword, confirmPassword, currentPassword } =
      req.body;

    if (!username || !email) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const vaildPassword = await bcrypt.compare(currentPassword, user.password);

    if (!vaildPassword) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    if (newPassword.trim().length < 6) {
      return res
        .status(400)
        .send({ message: "Password must be at least 6 characters long" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match" });
    }

    const newEmail = email.toLowerCase();

    const emailExist = await User.findOne({ email: newEmail });
    if (emailExist && emailExist._id.toString() !== req.user._id.toString()) {
      return res.status(400).send({ message: "Email already exists" });
    }

    const newUsername = username.toLowerCase();

    const usernameExist = await User.findOne({
      username: newUsername,
    });
    if (
      usernameExist &&
      usernameExist._id.toString() !== req.user._id.toString()
    ) {
      return res.status(400).send({ message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        username: newUsername,
        email: newEmail,
        password: hashedPassword,
      },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).send({ message: "Error while updating user", error });
  }
};

// GET ALL USERS {GET} /USER/allusers

exports.allUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send({ message: "Error while getting all users", error });
  }
};