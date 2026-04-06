const express = require("express");
const cors = require("cors");

const connect = require("./connection");
const bookingRoutes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", bookingRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  await connect();
  console.log("Server running on port", PORT);
});
