const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  productCode: {type: String,required: true, minlength:8,unique:true},
  productName: {type: String,required: true},
  productLine: {type: String,required: true},
  productScale: {type: String,required: true},
  productVendor: {type: String,required: true},
  productDescriptioin: {type: String,required: true},
  quantityInStock: {type: String,required: true},
  buyPrice: {type: String,required: true},
  MSRP: {type: String,required: true},
  
})

//.model(export-name, schema, collection-name)
module.exports = mongoose.model('productLineModel', productSchema)
