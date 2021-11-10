const express = require('express');
const router = express.Router();
const Customer = require('../models/customer_model');

// retrieve all records from database
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers)
    } catch (err) {
        console.log(err);
    }
});

// save data in to database
router.post('/addCustomer', async (req, res) => {
    const customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        order: {
            orderId: req.body.order.orderId,
            title: req.body.order.title,
            price: req.body.order.price,
        }
    });
    try {
        const savedCustomer = await customer.save();
        res.json(savedCustomer)
    } catch (err) {
        console.log(err);
    }
});


// retrieve an object for specific id
router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.json(customer);
    } catch (err) {
        console.log(err);
    }
});


// update a specific document 
router.patch('/:id', async (req, res) => {
    try {
        const updatedCustomer = await Customer.updateOne({ _id: req.params.id }, {
            $set: {
                email: req.body.email
            }
        });
        res.json(updatedCustomer);
    } catch (err) {
        console.log(err);
    }
});


// delete specific document 
router.delete('/:id', async (req, res) => {
    try {
        const deletedCustomer = await Customer.deleteOne({ _id: req.params.id });
        res.json(deletedCustomer);
    } catch (err) {
        console.log(err);
    }
});


module.exports = router;