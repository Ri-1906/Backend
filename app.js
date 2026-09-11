const express = require('express')
const noteModel = require ("./models/note.model")

const app = express();
app.use(express.json())
/*
    POST /notes => create a note
    GET/ notes => get all notes
    DELETE /notes/:id => Delete a note 
    PATCH /otes/:id => update a note

*/ 

app.post("/notes",async (req,res)=> {
    const data = req.body
    await noteModel.create({
        title: data.title,
        description: data.description
    })

    res.status(201).json({
        message: "note created"
    })
});

app.get("/notes",async (req,res) => {
    const notes = await noteModel.find()

    // find k sath b condition laga skte h (us name s sare fetch krega)

    // find => [{},{}] or []
    // findOne => {} or null

    /* const notes = await noteModel.findOne({
        title : "test_title"   // will only find one (based on the condition)
    }) */

    res.status(200).json({
        message : "Notes fetched succesfully",
        notes: notes
    })
});

app.delete("/notes/:id", async (req,res) => {
    const id = req.params.id
    await noteModel.findByIdAndDelete({
        _id : id
    })

    res.status(200).json({
        message : "ID deleted successfully"
    })
})

app.patch("/notes/:id",async (req,res) => {
    const id = req.params.id
    const description = req.body.description

    await noteModel.findOneAndUpdate({_id:id}, {description: description})

    res.status(200).json({
        message: "Note updated."
    })
})


module.exports = app