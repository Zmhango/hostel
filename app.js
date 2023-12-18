const express = require('express');
const mysql = require("mysql2");
const session = require("express-session");
const path = require("path");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv').config()
const saltRounds = 10; // Number of salt rounds
const fs = require('fs');
const connection = require('./db');
const bodyParser = require('body-parser');

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Log the received data
        console.log('Received:', username, email, password);

        // Ensure all data is available before proceeding
        if (!username || !email || !password) {
            return res.status(400).send('Incomplete data');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the user into the database
        connection.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword],
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).send('Error registering user');
                } else {
                    res.render("login")
                }
                
            }
        );
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }     
});



  
  







app.use(
    session({
        secret: "your-secret-key",
        resave: true,
        saveUninitialized: true,
    })
);

app.get("/", (req,res) =>{
    const data = {
        title:"home",
        active:"home"
    }
    res.render("index", data)
})

app.get("/about", (req, res)=>{
    res.render("about")
})

app.get("/contact", (req, res)=>{
    res.render("contact")
})

app.get("/register", (req, res)=>{
    res.render("register")
})

app.get("/login", (req, res)=>{
    res.render("login")
})

app.get("/tenant", (req, res)=>{
    res.render("tenant")
})

app.get("/landlord", (req, res)=>{
    res.render("landlord")
})


















app.listen(port, () =>{
    console.log(`Server Started on port ${port}`)
})