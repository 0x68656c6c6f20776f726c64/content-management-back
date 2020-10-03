const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    fileId:{type:String,require:true,unique:true},
    fieldname:String,
    originalname:String,
    encoding:String,
    mimetype:String,
    destination:String,
    filename:String,
    path:String,
    size:Number
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false
});


module.exports = mongoose.model('File', schema);