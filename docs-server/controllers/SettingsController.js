const User = require("../models/userModel");

exports.settings = async (req, res) => {
  try {
    const { sortOption, mainTitle, disableGreetings } = req.body;

    console.log({ sortOption, mainTitle, disableGreetings });

    const user = req.user;

    const updateSettings =  await User.findByIdAndUpdate(
      user._id,
      {
        settings: {
          sortOption,
          mainTitle,
          disableGreetings,
        },
      },
      { new: true }
    );

    if (!updateSettings) {
      return res.status(400).send({ message: "Error while updating settings" });
    }

    res.send({ message: "Settings updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error while updating settings", error });
  }
};
