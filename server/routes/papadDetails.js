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

router.post('/', async (req, res) => {
    const { name, desc, pricing, ingredients, values } = req.body
    if (!validator.isEmpty(name) ||
        !validator.isEmpty(pricing) ||
        !validator.isEmpty(values)) {

        const papadDetail = new papadDetails({
            name: name,
            desc: desc,
            pricing: pricing,
            ingredients: ingredients,
            values: values
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
    const { name, desc, pricing, ingredients, values } = req.body
    if (!validator.isEmpty(name) ||
        !validator.isEmpty(pricing) ||
        !validator.isEmpty(values)) {

        const data = await papadDetails
            .updateOne({ _id: req.params.id }, {
                $set: {
                    name: name,
                    desc: desc,
                    pricing: pricing,
                    ingredients: ingredients,
                    values: values
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

module.exports = router