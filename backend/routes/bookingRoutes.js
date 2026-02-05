const router = require("express").Router();
const Booking = require("../models/Booking");

router.post("/", async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.json({ message: "Booked!" });
});

router.get("/:userId", async (req, res) => {
  const data = await Booking.find({ user: req.params.userId });
  res.json(data);
});

module.exports = router;
