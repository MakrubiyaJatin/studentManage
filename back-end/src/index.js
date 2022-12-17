
const express = require("express")
const app = express();
const cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser');
require("dotenv").config();
const cookieParser = require('cookie-parser');
var session = require('express-session');
const router = require("./routes");
const { conn } = require("./config/db.config");
const { authenticate } = require("./utils/auth");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('cookie-secret-here'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '8080';

app.get('/', (req, res) => {
    res.send("Server Running fine!")
})
app.use('/api', authenticate, router)

app.listen(port, host, () => {
    console.log(`Server Running on http://${host}:${port}`);
})
