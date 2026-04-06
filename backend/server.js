const express = require("express");
const cors = require("cors");

const connect = require("./connection");
const bookingRoutes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BookMyShow backend running");
});

app.use("/api", bookingRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await connect();
    console.log("MongoDB connected");
    console.log("Server running on port", PORT);
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
});
