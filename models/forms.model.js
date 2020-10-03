const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    groupId: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    inputs: [
        {
            inputId:{type:String,unique:true,required:true},
            lable:{type:String,required:true},
            placeholder:String
        }
    ]
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});


module.exports = mongoose.model('Form', schema);