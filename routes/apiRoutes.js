const router = require('express').Router();
// const store = require('../db/store');
const db = require('../db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
// create a route that respondes with all notes coming from the database

router.get('/notes', (req, res) => {
    res.json(db)
})

router.post('/notes', (req, res) => {
    req.body.id = uuidv4();
    let dbString = db
    console.log(dbString)
    // console.log("dbCopy",dbCopy)

    dbString.push(req.body)
    res.json(true)


    console.log(dbString)
    let jsonDbString = JSON.stringify(dbString)

    fs.writeFileSync('db/db.json',jsonDbString, err => {
        if(err) console.log(err)
    })

    // console.log("dbCopy",dbCopy)
})

router.delete("/notes/:id", (req, res)  => {
    res.json(true)
    let id = req.params.id
    console.log(req.params)
    let dbString = db
    let index = dbString.findIndex(item => item.id === id)
    dbString.splice(index, 1)
    
    let jsonDbString = JSON.stringify(dbString)

    fs.writeFileSync('db/db.json',jsonDbString, err => {
        if(err) console.log(err)
    })
})
// localhost:/3000/api/notes








module.exports = router;