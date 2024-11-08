const express = require('express');
const {errorHandler} = require("./middleware/errorMiddleware");
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000;

//connect to db
connectDB();

const app = express();

app.use(express.json()); // accept the raw json to be sent
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
    res.status(200).send("Welcome to support desk API");
})

app.use(errorHandler)

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));