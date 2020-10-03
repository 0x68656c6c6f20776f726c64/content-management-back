const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    key: { type: String, unique: true, required: true },
    title: { type: String, required: true }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Projects_categories', schema);