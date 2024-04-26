const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const { user } = req.cookies;
  console.log(user);
  res.send("movies index");
});

router.get("/create", (req, res) => {
  res.send(`movies create`);
});

router.post("/", (req, res) => {
  res.send(`movies store`);
});

router.post("/:id", (req, res) => {
  res.send(`movies show`);
});

router.put("/:id", (req, res) => {
  res.send(`movies update`);
});

router.delete("/:id", (req, res) => {
  res.send(`movies delete`);
});

module.exports = router;
