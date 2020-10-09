const mongoose = require('mongoose')

const officeModel = new mongoose.Schema({
    officeCode: {type: String,required: true,minlength:1},
    city: {type: String,required: true,minlength:1},
    phone: {type: String,required: true,minlength:1},
    addressLine1: {type: String,required: true,minlength:1},
    addressLine2: {type: String,required: true},
    state: {type: String,required: true},
    country: {type: String,required: true,minlength:1},
    postalCode: {type: String,required: true,minlength:1},
    territory: {type: String,required: true,minlength:1}
    
})

//.model(export-name, schema, collection-name)
module.exports = mongoose.model('Offices', officeModel)
