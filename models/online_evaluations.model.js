const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    evaluationId: { type: String, unique: true, required: true },
    projectId: {type:String, required:true},
    disable: {type:Boolean, default:true},
    formGroupsId: [{type:String, unique:true}]
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});


module.exports = mongoose.model('Online_evaluation', schema);