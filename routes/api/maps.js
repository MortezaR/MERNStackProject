const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
let ObjectID = require('mongodb').ObjectID;

const Maps = require("../../models/Map")
const Object = require("../../models/Object");
const validateMapInput = require("../../validation/maps")

router.get("/test", (req, res) => {
    res.json({  msg: "This is the maps route" });
});

router.get('/', (req, res) => {
    Maps.find()
        .sort({ date: -1})
        .then(maps => res.json(maps))
        .catch(err => res.status(404).json({nomaps: 'No maps found!'}))
})

router.get('/:id', (req, res) => {
    Maps
        .findById(req.params.id)
        .then(map => res.json(map))
        .catch(err => res.status(400).json({mapnotfound: "No map found with that ID!"}))
})

router.post('/',
    passport.authenticate('jwt', { session: false}),
    (req, res) => {
        const { errors, isValid } = validateMapInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors)
        }

        const newMap = new Maps({
            title: req.body.title,
            user: req.user.id,
            objects: req.body.objects
        });

        newMap.save().then(map => res.json(map));
    }
            // const newArr = [];
        // console.log(req.body.title)
        // debugger
        // req.body.objects.forEach(obj => {
        //     let temp = new Object({
        //         name: obj.name,
        //         position: obj.position,
        //         status: obj.status
        //     })
        //     newArr.push(temp)
        // })
        // debugger
)

module.exports = router;