const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  _uid: {type:mongoose.ObjectId, requiredPaths:true},
  detail: {type: String,required: true, minlength:1},
  name: {type: String,required: true, minlength:1},
  goods:[{
    _id: {type:mongoose.ObjectId, requiredPaths:true},
    _uid: {type:String, requiredPaths:true}
  }],
  comments:[{
    _id: {type:mongoose.ObjectId, requiredPaths:true},
    name: {type: String,required: true, minlength:1},
    _uid: {type:String, requiredPaths:true},
    comment: {type:String,required:true, minlength:1}
  }],
  created: {type: Date,required: true,default: Date.now},
  updated: {type: Date,required: true,default: Date.now}
})

//.model(export-name, schema, collection-name)
module.exports = mongoose.model('Transaction', transactionSchema)