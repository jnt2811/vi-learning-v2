const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

app.all("/api/resources/*", [require("./routes/route_guard")]);
app.use("/", require("./routes"));

app.use((req, res, next) => {
  req.statusCode = 404;
  next();
});

app.listen(process.env.PORT || 5000);
