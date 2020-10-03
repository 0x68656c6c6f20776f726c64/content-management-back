const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const app_settings = require('./../appSettings.json');

const schema = new Schema({
    articleId: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    category: { type: String, required: true },
    disabled: { type: Boolean, default: true},
    image:{type:String,default:app_settings.api_Url+'/pictures/default'},
    description:{type:String,default:""},
    content:{type:String,default:"<p></p>"}
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});


module.exports = mongoose.model('Article', schema);