const express = require('express');
const jwt = require('jsonwebtoken');
const { productModel } = require('../db');
const ProductRouter = express.Router();

ProductRouter.get('/', (req, res) => {
    res.send("Healthy");
});

ProductRouter.post('/create', async (req, res) => {
    console.log('/create request');
    try {
        const { title,price,stock,image,unit,duration } = req.body;

        if(!title || !price || !stock || !image || !unit || !duration){
            return res.status(400).json({msg:"Please fill all the fields"});
        }
        const product = await productModel.create({ title,price,stock,image,unit,duration });

        res.status(200).json({ msg: "Product created successfully", product });

    } catch (err) {
        res.status(500).json({ msg: err.message + "server error" });
    }
});


ProductRouter.post('/delete', async (req, res) => {
    try {
        const { id } = req.query;
        if(!id){
            return res.status(400).json({ msg: "ID is required" });

        }
        await productModel.findByIdAndDelete(id);

        return res.json({ msg: "Deleted" });
    } catch (err) {
        res.status(500).json({ msg: err.message + " - server error" });
    }
});
ProductRouter.post('/update', async (req, res) => {
    try {
        const { id } = req.query;
        const { title, price, stock } = req.body;

        // Check if ID is provided
        if (!id) {
            return res.status(400).json({ msg: "ID is required" });
        }

        // Build the update object dynamically
        let updateFields = {};
        if (title) updateFields.title = title;
        if (price) updateFields.price = price;
        if (stock) updateFields.stock = stock;

        // If no fields to update, return a message
        if (Object.keys(updateFields).length === 0) {
            return res.status(200).json({ msg: "Everything is up-to-date" });
        }

        // Perform the update
        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true } // Returns the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }

        return res.status(200).json({ msg: "Product updated successfully", updatedProduct });
    } catch (err) {
        res.status(500).json({ msg: `${err.message} - server error` });
    }
});




module.exports = ProductRouter;
