// server ko create karna
const express = require('express')

const app = express()
app.use(express.json())
const notes = [] 
// title,description

app.post("/notes" , (req,res)=>{
    // console.log(req.body)
    notes.push(req.body)
    res.status(201).json({
        message : "note created succcesfully"
    })
})

app.get('/notes',(req,res)=>{
    res.status(200).json({
        message : "notes fetched succesfully",
        notes: notes
    })
})


//delete /notes/4
app.delete('/notes/:index',(req,res)=>{
    const i = req.params.index // 4
    delete notes[i]
    res.status(200).json({
        message : "note deleted succesfully"
    })
}) 

app.patch('/notes/:index',(req,res)=>{
    const index = req.params.index
    const description = req.body.description

    notes[index].description =description
    res.status(200).json({
        message: "note updated succesfully"
    })
})

module.exports = app