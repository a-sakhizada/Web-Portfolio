const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

//set the view engine to ejs
app.set('view engine', 'ejs');

//use styles.css
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));

//use res.render to load up an ejs view file

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
});

//index page
app.get('/', async (req, res) => {
    //const result = await sendMail();
    res.render('pages/index');
});