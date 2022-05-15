const express = require('express');
// const express = require('express');
const mysql = require('mysql');
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// create a connection to our database

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port' + listener.address().port)
})

// implementing CRUD

app.get("/albums", (req, res) => {
    db.query("SELECT * FROM music_albums", (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

// SQL query to save new music into the the db
app.post("/albums", (req, res) => {
    const insertQuery = `${"INSERT INTO music_albums SET ?"}`
    db.query(insertQuery, req.body, (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send("Review Added to Database")
        }
    })
})

app.put("/albums/:id", (req, res) => {
    const updateQuery = "UPDATE music_albums SET album_title=?, artist_name=?, album_sales=? WHERE id =?"
    db.query(updateQuery, [req.body.album_title, req.body.artist_name, req.body.album_sales, req.params.id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    } ) 
})

app.delete('/albums/:id', (req, res) => {
    db.query("DELETE FROM music_albums WHERE id = ?", req.params.id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    })
})




// [req.body.album_title, req.body.artist_name, req.body.album_sales, req.params.id]
