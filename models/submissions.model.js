const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    submissionId: { type: String, unique: true, required: true },
    name:{type:String},
    relatedTitle: { type: String, required: true },
    submitTime: { type: String, required: true },
    status: { type: String, default: "unread"},
    content:[
        {
            key:String,
            value:String
        }
    ]
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret.id;
        delete ret._id;
    }
});


module.exports = mongoose.model('Submission', schema);