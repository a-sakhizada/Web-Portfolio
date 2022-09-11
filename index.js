const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const nodemailer = require("nodemailer");


const app = express();

//set the view engine to ejs
app.set("view engine", "ejs");

//use styles.css
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));


//use res.render to load up an ejs view file

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});
transporter.verify().then(console.log).catch(console.error);

//index page
app.get("/", async (req, res) => {
  //const result = await sendMail();
  res.render("pages/index");
});


app.post("/message", (req, res) => {
    const fromEmail = req.body.email;
  transporter
    .sendMail({
      to: process.env.USER_EMAIL, // list of receivers
      subject: `${req.body.name} - ${req.body.subject}`, // Subject line
      html: `<p>senders email: ${req.body.email}<br> senders name: ${req.body.name} <br> msg: ${req.body.message}</p>`, // html body
    })
    .then(() => {
        console.log("working!");
    })
    .catch(err => {
        console.log("error");
    });
    res.redirect('/');
});
