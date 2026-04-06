const express = require("express");
const router = express.Router();
const Booking = require("./Schema");

router.post("/booking", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(200).send(booking);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/booking", async (req, res) => {
  try {
    const lastBooking = await Booking.findOne().sort({ _id: -1 });

    if (!lastBooking) {
      return res.send({ message: "no previous booking found" });
    }

    res.send(lastBooking);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
