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

router.get('/user/:user_id', (req, res) => {
    Maps.find({user: req.params.user_id})
        .sort({ date: -1 })
        .then(maps => res.json(maps))
        .catch(err =>
            res.status(404).json({ nomaps: 'No maps found from that user' }
        )
    );
});

router.get('/:id', (req, res) => {
    Maps
        .findById(req.params.id)
        .then(map => res.json(map))
        .catch(err => res.status(400).json({mapnotfound: "No map found with that ID!"}))
})

router.delete('/:id', 
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Maps.findById(req.params.id)
        .then(foundMap => {
            if (req.user.id !== foundMap.user.toString()) {
                return res.status(400).json({authorization: 'Not authorized to delete!'})
            } else {
            Maps.deleteOne({_id: req.params.id})
            .then(() => res.json('Map deleted!'))
            .catch(err => res.status(500).json({mapdeletion: "Could not delete!"}))
            }
        }).catch(err => res.status(404).json({foundMap: "Map not found!"}))
    }
)

router.post('/',
    passport.authenticate('jwt', { session: false}),
    (req, res) => {
        const { errors, isValid } = validateMapInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors)
        }
        debugger;
        console.log('hello')
        const newMap = new Maps({
            title: req.body.title,
            user: req.user.id,
            objects: req.body.objects,
            url: req.body.url
        });
        newMap.save().then(map => {
            console.log('success')
            return res.json(map)
        })
        .catch(err => res.status(400).json(err));
    }
)

router.put('/:id', 
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Maps.findById(req.params.id)
        .then(foundMap => {
            if (req.user.id !== foundMap.user.toString()) {
                return res.status(400).json({authorization: 'Not authorized to edit!'})
            } else {
                Maps.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, map) => {
                if (err) return res.status(500).send(err)
                return res.send(map)
                })
            }
        }).catch(err => res.status(404).json({foundMap: "Map not found!"}))
    }
)




module.exports = router;

            // const newArr = [];
        // console.log(req.body.title)
        // req.body.objects.forEach(obj => {
        //     let temp = new Object({
        //         name: obj.name,
        //         position: obj.position,
        //         status: obj.status
        //     })
        //     newArr.push(temp)
        // })
