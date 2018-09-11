const express = require('express');
const orderRouter = express.Router();
const orderModel = require("../model/OrderModel");


//Lấy thông tin sản phẩm
orderRouter.get("/:id", (req, res) => {
    orderModel.findById(req.params.id)
        .populate('owner', 'email name avatarUrl')
        .populate('orderList.product')
        .then(orderFound => {
            if (!orderFound) res.status(404).send({ success: 0, message: 'Order Not Found' })
            else res.send({ success: 1, orderFound });
        })
        .catch(err => res.status(500).send({ success: 0, err }));
})

//Tạo sản phẩm
orderRouter.post("/", (req, res) => {
    const { owner, address, phoneNumber, orderList, note } = req.body;
    orderModel.create({ owner, address, phoneNumber, orderList, note })
        .then(orderCreated => res.send({ success: 1, orderCreated }))
        .catch(err => res.status(500).send({ success: 0, err })
        )
})

module.exports = orderRouter;
