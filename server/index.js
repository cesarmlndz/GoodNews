const express = require("express");
const app = express();
const cors = require("cors");
const listingRoutes = require("./routes/routes.js");
require("dotenv").config();

const PORT = 5001;

app.use(cors());
app.use(express.json());
app.use("/", listingRoutes);

app.listen(process.env.PORT || PORT, () => {
    console.log("Server running.")
});