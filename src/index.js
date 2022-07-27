const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const bodyParser = require("body-parser");

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

const compression = require("compression");
app.use(compression());

const dotenv = require("dotenv");
dotenv.config();

app.all("/api/resources/*", [require("./routes/route_guard")]);
app.use("/", require("./routes"));

app.use((req, res, next) => {
  req.statusCode = 404;
  next();
});

app.listen(process.env.PORT || 5000);
