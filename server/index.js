const express = require("express");
const app = express();
const cors = require("cors");
const listingRoutes = require("./routes/routes.js");

app.use(cors());
app.use(express.json());
app.use("/", listingRoutes);

app.listen(5001, () => {
    console.log("Server running.")
});