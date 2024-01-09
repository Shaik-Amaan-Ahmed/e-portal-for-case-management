const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const login = require("./auth/authLogin");
const logout = require("./auth/authLogout");
const judgeToken = require("./verifyToken/judgeToken");
const clientToken = require("./verifyToken/clientToken");
const registrarToken = require("./verifyToken/registrarToken");
const registerClient = require("./create-docs/clientRegister");
const registerJudge = require("./create-docs/judgeRegister");
const efiling = require("./create-docs/clientEfiling");
const casedetails = require("./fetch-data/sendCaseDetails");
const sendCaseCategory = require("./fetch-data/sendCaseCategory");
const bodyParser = require('body-parser');
require("dotenv").config();


const app = express();
const port = process.env.PORT || 4000;

const URI = process.env.URI; //database URI
//connecting database
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error: ", err.message);
  });

app.use(cookieParser());
//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/login", login);
app.use("/logout", logout);
app.use("/judge", judgeToken);
app.use("/client", clientToken);
app.use("/registrar", registrarToken);
app.use('/register', registerClient);
app.use('/judge-register',registerJudge);
app.use('/e-filing', efiling);
app.use('/casedetails',casedetails);
app.use('/uploads', express.static('uploads'));
app.use('/case-category', sendCaseCategory);


app
  .listen(port, (res, req) => {
    console.log(`Server is running on port: ${port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
