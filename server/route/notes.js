

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
 const fetchuser=require('../middleware/fetchuser')
//  const cookieParser = require("cookie-parser");
//  router.use(cookieParser());

JWT_SECRET = "shoaibzakiisagood"

require('../db/conn')

const User = require('../model/userschema1');
// ROUTE 1: Add a new Note using:  Login required
router.post('/Addnote', [
    body('name', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { name, email,phone,description } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                name, email, phone,description, user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 2: Update an existing Note using Login required
router.put('/Updatenote/:id',  async (req, res) => {
    const { name, email, phone,description } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (name) { newNote.name = name };
        if (email) { newNote.email = email };
        if (phone) { newNote.phone = phone };
        if (description) { newNote.description = description };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}) 

// ROUTE 3: Delete an existing Note Login required
   router.delete('/Deletenote/:id',  async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
   
    }

})
module.exports = router