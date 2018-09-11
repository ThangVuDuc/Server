const express = require('express');
const shopRouter = express.Router();
const shopModel = require('../model/ShopModel');

shopRouter.use((req, res, next) => {
    console.log("Router api");
    next();
})

//Tạo cửa hàng trước vì phải tạo cửa hàng thì mới có ID để gán vào sản phẩm.
shopRouter.post('/', (req, res) => {
    const { owner, title, description } = req.body;
    console.log(owner, title, description );
    shopModel.create({ owner, title, description })
        .then(shopCreated => {
            res.send({ success: 1, shopCreated });
        })
        .catch(err => res.status(500).send({ success: 0, err }));
});

//Thay đổi thông tin shop
shopRouter.put('/:id', (req,res) => {
    const updateShop = {title, description, openOrClose, comments, productList, listOrder} = req.body;
    console.log(updateShop[title]);
    shopModel.findById(req.params.id)
        .then(shopFound => {
            if(!shopFound) res.status(404).send({success: 0, message: 'Shop Not Found'});
            else {
                for (const key in shopFound) {
                    if (updateShop[key]) {
                        shopFound[key] = updateShop[key];
                    }
                }
                return shopFound.save();
            }
        })
        .then(shopUpdated => res.send({success: 1, shopUpdated}))
        .catch(err => res.send({success: 0, err}));
})

//Lấy tất cả các shop bán hàng sắp xếp từ mới nhất, Giới hạn 20 cửa hàng mỗi request và có NextPageToken (0, 1, 2, 3, ...)
shopRouter.put('/', (req, res) => {
    let token = (req.body.nextPageToken) ? req.body.nextPageToken : 0;
    let nextPageToken = token;
    shopModel.find({}, ' -comment ')
        .skip(20 * token)
        .limit(20)
        .populate('owner', 'name avaUrl')
        .then(shops => {
            shopModel.countDocuments()
            .then(count => {
                nextPageToken = (count > (++ token) * 20) ? (token) : (undefined);
                res.send({ success: 1, shops, nextPageToken})
            })
        })
        .catch(err => res.status(500).send({ success: 0, err }));
});

//Lấy thông tin của 1 cửa hàng
shopRouter.get('/:id', (req,res) => {
    shopModel.findById(req.params.id)
        .populate('owner', "name")
        .populate('comments.owner', 'name _id')
        .populate('productList')
        .populate('listOrder')
        // .populate('listOrder.orderList.product')
        .exec((err, shopFound) => {
            if(err) res.status(500).send({success: 0, err});
            if(!shopFound) res.status(404).send({success: 0, message: 'Shop Not Found'});
            else {
                // console.log(shopFound);
                // console.log("ahih");
                res.send({success: 1, shopFound});
            };
        })
        // .catch(err => res.status(500).send({success: 0, err}));
})


module.exports = shopRouter;