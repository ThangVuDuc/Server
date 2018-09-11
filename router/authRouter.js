const express = require("express");
const authRouter = express();
const userModel = require("../model/userModel");
const lodash = require('lodash');


//Taoj session
authRouter.post("/", (req, res) => {
    const { owner, address, phoneNumber, orderList, note } = req.body;
    req.session.order = {
        owner: owner,
        address: address,
        phoneNumber: phoneNumber,
        orderList: orderList,
        note: note
    }
    console.log(req.session);
    res.send({ success: 1, message: "success" })
});


//Lấy session
authRouter.get("/", (req, res) => {
    console.log(req.session);
    if (lodash.isUndefined(req.session) && lodash.isUndefined(req.session.order)) {
        res.status(404).send({ success: 0, message: "user not found" });
    } else {
        res.send({ success: 1, orderData: req.session.order });
    }
});

//Thay đổi session
authRouter.put("/", (req, res) => {
    const updateOrder = { address, phoneNumber, orderList, note } = req.body;
    let orderSession = req.session.order;
    for (const key in orderSession) {
        if (updateOrder[key]) {
            orderSession[key] = updateOrder[key];
        }
    }
    req.session.order = orderSession;
    res.send({ success: 1, session: orderSession });
})

//Xóa session
authRouter.delete('/', (req, res) => {
    req.session.destroy(err => {
        if(err) res.status(500).send({success: 0, err});
        else res.send({success: 1, message: "Remove success"});
    })
})

module.exports = authRouter;