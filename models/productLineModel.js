const mongoose = require('mongoose')

const productLineSchema = new mongoose.Schema({
  productLine: {type: String,required: true, minlength:1},
  textDescription: {type: String,required: true, minlength:1},
  htmlDescription: {type: String},
  image: {type: String}
  
})

//.model(export-name, schema, collection-name)
module.exports = mongoose.model('productLineModel', productLineSchema)
