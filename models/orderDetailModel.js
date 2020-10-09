const mongoose = require('mongoose')

const orderDetailModel = new mongoose.Schema({
    orderNumber: {type: String,required: true,minlength:1},
    productCode: {type: String,required: true,minlength:1},
    quantityOrdered: {type: String,required: true,minlength:1},
    priceEach: {type: String,required: true,minlength:1},
    orderLineNumber: {type: String,required: true,minlength:1}
    
})

//.model(export-name, schema, collection-name)
module.exports = mongoose.model('oderdetails', orderDetailModel)
