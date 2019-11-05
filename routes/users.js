/* eslint-disable quotes */
/* eslint-disable no-useless-return */
const router = require("express").Router();

const {
  getUsers,
  getUsersId
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", getUsersId);

router.get("/:someRequest", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
  return;
});

module.exports = router;
