const express = require('express');
const path = require('path');
const app = express();

require('dotenv').config();

// Middleware to check working hours
const checkWorkingHours = (req, res, next) => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ... 6 = Saturday etc.
    const hour = now.getHours(); // 24-Hour format

    if (day >= 1 && day <= 5 && hour >= 9 && hour <= 17) {
        next(); // Proceed to the next route
    } else {
        res.send('Sorry, we are closed now. Please visit us during working hours.(Monday to Friday, 9:00am to 17:00pm)');
    }
};

// Applying middleware to all routes.

app.use(checkWorkingHours);

// Setting the view engine to project HTML files 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

//Static folder for CSS, JS, images etc.
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/services', (req, res) => {    
    res.render('services');
});

// Start the server
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});