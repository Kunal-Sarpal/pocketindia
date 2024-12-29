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

module.exports = ProductRouter;
