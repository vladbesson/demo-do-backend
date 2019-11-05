/*
 eslint-disable object-shorthand */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getUsersId = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then(user => {
      if (user == null) {
        res.status(404).send({ message: "Пользователь не найден" });
      } else {
        res.send({ data: user });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.postUser = (req, res) => {
  const { email, password } = req.body;

  console.log("req.body ", req.body);

  bcrypt.hash(password, 10).then(hash =>
    User.create({ email, password: hash })
      .then(user => res.status(201).send({ data: user }))
      .catch(err => res.status(500).send({ message: err.message }))
  );
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then(user => {
      const token = jwt.sign({ _id: user._id }, "1", { expiresIn: "7d" });
      res.cookie("jwt", token);
      res.status(201).send({ user, token });
    })
    .catch(err => {
      res.status(401).send({ message: err.message });
    });
};
