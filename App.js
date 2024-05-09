const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const PORT = 8080;
const router = require("./route");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

app.listen(PORT, () => {
  console.log(`application started`);
});
