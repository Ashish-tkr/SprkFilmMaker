const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const paymentRoutes = require("./routes/paymentRoutes");
const registrationRoutes = require("./routes/registrationRoutes");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));


app.use(cors());
app.use(bodyParser.json());

app.use("/api/payment", paymentRoutes);
app.use("/api/register", registrationRoutes);

app.get("/", (req, res) => {

  res.sendFile(
    path.join(__dirname, "../frontend/index.html")
  );

});

app.get("/api", (req, res) => {
  res.send("INDIA SPARK TALENT SHOW API RUNNING");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});