const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const login = require("./auth/authLogin");
const logout = require("./auth/authLogout");
const changePassword = require("./create-docs/changePassword");
const judgeToken = require("./verifyToken/judgeToken");
const clientToken = require("./verifyToken/clientToken");
const defendantToken = require("./verifyToken/defendantToken")
const registrarToken = require("./verifyToken/registrarToken");
const registerClient = require("./create-docs/clientRegister");
const registerJudge = require("./create-docs/judgeRegister");
const registerRegistrar = require("./create-docs/registrarRegister");
const efiling = require("./create-docs/clientEfiling");
const casedetails = require("./fetch-data/sendCaseDetails");
const sendCaseCategory = require("./fetch-data/sendCaseCategory");
const judgeMakeNotes = require("./create-docs/judgeMakeNotes");
const contactUs = require("./create-docs/contact");
const approvedcaseshandler = require("./create-docs/approvedCasesHandling");
const bodyParser = require('body-parser');
const dataSender = require("./fetch-data/dataSender");
// require('events').EventEmitter.defaultMaxListeners = 20;
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//routes
app.use("/login", login);
app.use("/logout", logout);
app.use("/judge", judgeToken);
app.use("/client", clientToken);
app.use("/registrar", registrarToken);
app.use('/defendant', defendantToken)
app.use('/client-register', registerClient);
app.use('/defendant', defendantToken)
app.use('/client-register', registerClient);
app.use('/judge-register',registerJudge);
app.use('/registrar-register',registerRegistrar)
app.use('/registrar-register',registerRegistrar)
app.use('/e-filing', efiling);
app.use('/casedetails',casedetails);
app.use('/uploads', express.static('uploads'));
app.use('/case-category', sendCaseCategory);
app.use('/contact-us', contactUs);
app.use('/approve-cases', approvedcaseshandler);
app.use('/data-sender', dataSender);
app.use("/change-password", changePassword);
app.use("/judge-notes", judgeMakeNotes);

app
  .listen(port, (res, req) => {
    console.log(`Server is running on port: ${port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });