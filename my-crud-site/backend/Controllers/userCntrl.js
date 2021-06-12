const User = require("../Models/User");
const razorPay = require("razorpay");
const shortId = require("short-id");

const razorpay = new razorPay({
  key_id: process.env.RAZOR_KEY,
  key_secret: process.env.RAZOR_KEY_SECRET,
});

const userCntrl = {
  registerUsers: async (req, res) => {
    try {
      const { name, email, age, gender } = req.body;

      if (!isEmail(email)) {
        return res.status(400).json({ err: "The email is not valid" });
      }
      await User.findOne({ email: email }).then((user) => {
        if (user) {
          return res.status(400).json({ message: "This email already exist" });
        } else {
          const user = new User({
            name: name,
            email: email,
            age: age,
            gender: gender,
          });

          user
            .save()
            .then((response) =>
              res.status(200).json({
                success: "user data saved successfully",
                result: response,
              })
            )
            .catch((err) => {
              res.status(400).json({ err: err });
            });
        }
      });
      function isEmail(email) {
        var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (email !== "" && email.match(emailFormat)) {
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  getUsersById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(400).json({ err: "user not found" });
      }
    } catch (error) {
      return res.status(400).json({ message: err.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      await User.find()
        .then((result) => {
          res.status(200).json({ userData: result });
        })
        .catch((err) => {
          res.status(400).json({
            err: err,
          });
        });
    } catch (err) {
      return res.status(400).json({ err: message.err });
    }
  },
  updateUser: async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.age = req.body.age || user.age;
      user.gender = req.body.gender || user.gender;

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        age: updatedUser.age,
        gender: updatedUser.gender,
      });
    } else {
      res.status(400).json({ err: `user not found` });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        await user.remove();
        res.status(200).json({ message: "user deleted successfully" });
      } else {
        res.status(400).json({ error: "user not found" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};

module.exports = userCntrl;
