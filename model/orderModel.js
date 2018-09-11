const mongosee = require("mongoose");
const Schema = mongosee.Schema;

const orderProductSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    amount: { type: Number }
});

const orderSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    address: { type: String, require: true },
    phoneNumber: { type: Number },
    orderList: [orderProductSchema],
    note: { type: String }
});

module.exports = mongosee.model("Order", orderSchema);
