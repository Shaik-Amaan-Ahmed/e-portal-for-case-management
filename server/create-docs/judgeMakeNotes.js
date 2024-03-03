const express = require('express');
const Judge = require('../models/judges');
const router = require('express').Router();

router.post('/save-notes', async (req, res) => { 
    const {email, caseId, date, notes} = req.body;
    try {
        const judge = await Judge.findOne({email});
        if(judge) {

            if(!judge.notes[caseId]) {
                judge.notes[caseId] = {};
            }

            judge.notes[caseId][date] = notes;
            judge.markModified('notes'); // Tell Mongoose that the notes field has been updated
            await judge.save();
            res.status(200).send("Notes saved successfully");
        } else {
            res.status(400).send("Judge not found");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error " + error);
    }
});

router.get('/get-notes', async (req, res) => { 
    const {email, caseId} = req.query;
    try {
        const judge = await Judge.findOne({email});
        if(judge) {
            const notes = judge.notes[caseId];
            if(notes) {
                res.status(200).send(notes);
            } else {
                res.status(400).send("No notes found");
            }
        } else {
            res.status(400).send("Judge not found");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error " + error);
    }
});

router.get('/search-notes', async (req, res) => { 
    const {email, caseId, date} = req.query;
    try {
        const judge = await Judge.findOne({email});
        if(judge) {
            const notes = judge.notes[caseId];
            if(notes) {
                const notesOnDate = notes[date];
                if(notesOnDate) {
                    res.status(200).send(notesOnDate);
                } else {
                    res.status(400).send("No notes found on this date");
                }
            } else {
                res.status(400).send("No notes found");
            }
        } else {
            res.status(400).send("Judge not found");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error " + error);
    }
})

router.post('/edit-notes', async (req, res) => { 
    const {email, caseId, date, notes} = req.body;
    try {
        const judge = await Judge.findOne({email});
        if(judge) {
            if(!judge.notes[caseId]) {
                judge.notes[caseId] = {};
            }
            judge.notes[caseId][date] = notes;
            judge.markModified('notes'); // Tell Mongoose that the notes field has been updated
            await judge.save();
            res.status(200).send("Notes edited successfully");
        } else {
            res.status(400).send("Judge not found");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error " + error);
    }
})

module.exports = router;