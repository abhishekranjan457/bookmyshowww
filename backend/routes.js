const express = require("express");
const router = express.Router();
const Booking = require("./Schema");

let lastBooking = null;

router.post("/booking", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    lastBooking = booking;
    res.status(200).send(booking);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/booking", async (req, res) => {
  if (!lastBooking) {
    return res.send({ message: "no previous booking found" });
  }
  res.send(lastBooking);
});

module.exports = router;
