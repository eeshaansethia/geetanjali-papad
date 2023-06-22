const express = require('express')
const router = express()
const papadDetails = require('../models/papadDetails')
const validator = require('validator')

router.get('/', async (req, res) => {
    const data = await papadDetails.find()
    res.json({
        data: data,
        status: 200
    })
})

router.get('/check', async (req, res) => {
    res.json({
        message: 'PapadDetails route is working',
        status: 200
    })
})

router.get('/:id', async (req, res) => {
    const data = await papadDetails.findById(req.params.id)
    res.json({
        data: data,
        status: 200
    })
})

router.post('/', async (req, res) => {
    const { name, desc, ingredients, value } = req.body
    if (!validator.isEmpty(name)) {
        const papadDetail = new papadDetails({
            name: name,
            desc: desc,
            ingredients: ingredients,
            value: value
        });

        const data = await papadDetail
            .save()
            .then(() => {
                res.json({
                    message: 'Data saved successfully',
                    status: 200
                })
            }).catch((err) => {
                res.json({
                    message: err,
                    status: 500
                })
            })
    } else {
        res.json({
            message: 'Please fill all the fields',
            status: 500
        })
    }
})

router.put('/:id', async (req, res) => {
    const { name, desc, ingredients, value } = req.body
    if (!validator.isEmpty(name)) {
        const data = await papadDetails
            .updateOne({ _id: req.params.id }, {
                $set: {
                    name: name,
                    desc: desc,
                    ingredients: ingredients,
                    value: value
                }
            })
            .then(() => {
                res.json({
                    message: 'Data updated successfully',
                    status: 200
                })
            }).catch((err) => {
                res.json({
                    message: err,
                    status: 500
                })
            })
    }
})

router.delete('/:id', async (req, res) => {
    const data = await papadDetails
        .deleteOne({ _id: req.params.id })
        .then(() => {
            res.json({
                message: 'Data deleted successfully',
                status: 200
            })
        }).catch((err) => {
            res.json({
                message: err,
                status: 500
            })
        })
})

module.exports = router