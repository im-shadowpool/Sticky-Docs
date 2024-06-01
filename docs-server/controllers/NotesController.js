const User = require("../models/userModel");

exports.createNote = async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const user = req.user;

    if (!title || !description || !tag) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const note = {
      title,
      description,
      tag,
    };

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $push: { notes: note } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    console.log("Updated user:", updatedUser);

    res.status(201).send({ message: "Note created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error while creating note", error });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const user = req.user;
    const notes = await User.findById(user._id);
    res.status(200).send(notes.notes);
  } catch (error) {
    res.status(500).send({ message: "Error while getting notes", error });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const user = req.user;
    console.log('user: ', user);

    const noteId = req.params.id;
    // console.log('noteId: ', noteId);

    
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $pull: { notes: { _id: noteId } } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    console.log("Updated user:", updatedUser);
    res.status(200).send({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error while deleting note", error });
  }
};
