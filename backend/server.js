const express = require('express');

const app = express();

app.get('/Jusef', (req, res)=> {
    res.send('vielen Dank!')
})

app.listen(3050, "localhost", () => {
    console.log("bald wird es Mittagspause")
})