const express = require("express");
const router = express.Router();
const Booking = require("./Schema");

// POST booking
router.post("/booking", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(200).json(booking);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET last booking
router.get("/booking", async (req, res) => {
  try {
    const lastBooking = await Booking.findOne().sort({ _id: -1 });

    if (!lastBooking) {
      return res.json({ message: "no previous booking found" });
    }

    res.json(lastBooking);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
