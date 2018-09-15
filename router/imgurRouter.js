const express = require('express');
const imgurRouter = express.Router();
const fs = require('fs');


imgurRouter.post("/", (req, res) => {
    console.log(req.body)
    
})

module.exports = imgurRouter;
