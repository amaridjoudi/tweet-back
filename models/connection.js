const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://schleks:didine06@cluster0.hsjou.mongodb.net/tweet";

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database tkt"))
  .catch((error) => console.error(error));
