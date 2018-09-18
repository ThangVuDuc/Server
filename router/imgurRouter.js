const express = require('express');
const imgurRouter = express.Router();
const fs = require('fs');
const imgurRequest = require('request');


imgurRouter.post("/", (req, res) => {
    let data = req.body;
    // let data = {
    //     base64: 'fudhfdhfdf',
    //     name: 'demo',
    //     type: 'demo'
    // }
    // console.log(req.body)
    let option = {
        url: 'https://api.imgur.com/3/image',
        header: {
            'Client-ID': '05b778b3d686546',
            'Bearer': '7a2cc13ed9d438518d0d21f3a29d4b407f5270eb'
        },
        body: {
            'image': data.base64,
            'title': data.name,
            'description': '',
            'name': data.name,
            'type': data.type
        }
    }
    option.json = true;

    // imgurRequest(option, (err, dataok) => {
    //     if(err) res.status(500).send({success: 0, err})
    //     else res.send({success: 1, dataok});
    //     })

    imgurRequest.post(option, (err, dataok) => {
        if (err) res.status(500).send({ success: 0, err })
        else {
            console.log(dataok.body)
            res.send({ success: 1, dataok })
        };
    });


    // // console.log(data)
    // console.log(data.type)
    // console.log(data.name)

})

module.exports = imgurRouter;
