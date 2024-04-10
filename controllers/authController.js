const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwttoken = require('jsonwebtoken');
const User = require('../models/User');

const registerUser =  async (req, res) => {
  const error = validationResult(req);
  console.log(error);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  try {
    const { name, password, email } = req.body;
    // if()
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User Already Exists' }] });

      // return new Error('User Already Exists')
    }
   

    user = new User({
      name,
      password,
      email,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwttoken.sign(
      payload,
      'itsasecret',
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) {
          throw err;
        } else res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

const loginUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  try {
    const { password, email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User Doesn't Exist" }] });

      // return new Error('User Already Exists')
    }

    // user = new User({
    //   name,
    //   password,
    //   avatar,
    //   email,
    // });

    const isPassCorrect = await bcrypt.compare(password, user.password);

    if (isPassCorrect) {
      const payload = {
        user: {
          id: user.id,
          role : user.role
        },
      };

      jwttoken.sign(
        payload,
        'itsasecret',
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) {
            throw err;
          } else
            res
              .status(200)
              .json({ msg: 'User Succesfully logged in', token });
        }
      );
    } else {
      res.status(500).json({ errors: [{ msg: 'Incorrect Credentials' }] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Incorrect Credentials' }] });
  }
};





module.exports = { registerUser, loginUser };

