
const express = require("express");
const cors = require("cors");

const connect = require("./connection");
const bookingRoutes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", bookingRoutes);

app.listen(8080, async () => {
  await connect();
  console.log("Server running on port 8080");
});
