const express = require('express');
const mysql = require("mysql2");
const session = require("express-session");
const path = require("path");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv').config()


const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 3000;

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "accommodation",
    password: "Zondiwe@123"

})

app.use(
    session({
        secret: "your-secret-key",
        resave: true,
        saveUninitialized: true,
    })
);

app.get("/", (req,res) =>{
  
    res.render("index")
})

app.get("/about", (req, res)=>{
    res.render("about")
})

app.get("/contact", (req, res)=>{
    res.render("contact")
})

app.get("/login", (req, res)=>{
    res.render("contact")
})
















app.listen(port, () =>{
    console.log(`Server Started on port ${port}`)
})