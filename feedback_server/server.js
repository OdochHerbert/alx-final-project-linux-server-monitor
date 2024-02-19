const express=require('express')
const path=require('path')
const mongoose=require('mongoose')
const session=require('express-session')
const cors = require('cors')
const nodemailer = require('nodemailer');

//SETTING UP MAILER
// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

//##CONNECTION TO MONGODB##/

//mongodb string
const mongoURI = 'mongodb://localhost/passportdb'; 

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Check if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

//Define express
const app=express()

//allow cors for all incoming links
app.use(cors());

// Middleware to parse JSON requests-- Handle my axios request
app.use(express.json());

///Bodyparser-gets data from the form with req.body
app.use(express.urlencoded({extended:false}))

//1.Express Session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))

//setting static public folder
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static('public'));

const PORT=process.env.PORT || 8080

//Defining route
app.use('/grace',require('./routes/grace'))

app.listen(PORT, console.log('Server started on '+ PORT))
