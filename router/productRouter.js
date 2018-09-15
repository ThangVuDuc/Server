const express = require('express');
const productRouter = express.Router();
const productModel = require("../model/productModel");


//Lấy thông tin sản phẩm
productRouter.get("/:id", (req, res) => {
    productModel.findById(req.params.id)
        .populate('shopID', 'title description')
        .then(productFound => {
            if(!productFound) res.status(404).send({success: 0, message: 'Product Not Found'})
            else res.send({success: 1, productFound});
        })
        .catch(err => res.status(500).send({success: 0, err}));
})

//Tạo sản phẩm
productRouter.post("/", (req, res) => {
    const { shopID, name, image, price } = req.body;
    productModel.create({ shopID, name, image, price })
        .then(productCreated => res.send({success: 1, productCreated}))
        .catch(err => res.status(500).send({success: 0, err})
    )
})

module.exports = productRouter;
