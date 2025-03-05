const express = require('express');
const sqlite3 = require('sqlite3')
const bodyParser = require('body-parser')

const app = express();

const db = new sqlite3.Database('./tasks.db')

app.use(bodyParser.json())         // Middleware

db.run('CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed BOOLEAN DEFAULT 0)')

db.run('INSERT INTO tasks (title) VALUES (?)', "Zähne putzen");

app.get('/Jusef', (req, res)=> {
    res.send('vielen Dank!')
})

app.post('/add', () => {
    db.run('INSERT INTO tasks (title) VALUES (?)', [req.body.title], function (){
        res.json({tag:"Mittwoch", bald_wirds: "Mittagspause"});
    })
})

app.listen(3050, "localhost", () => {
    console.log("bald wird es Mittagspause")
})