const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const config = require("./app/config");
const app = express();

require("dotenv").config();
require("./routes/requests.route")(app);
require("./routes/auth.route")(app);
require("./routes/users.route")(app);
require("./routes/residents.route")(app);
require("./routes/shop.route")(app);
require("./routes/managers.route")(app);

app.use(cors({ exposedHeaders: ["x-auth-token"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(config.MONGO.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDb...", err));

app.listen(config.SERVER.PORT, function () {
  console.log(`API running on port ${config.SERVER.PORT}`);
});
