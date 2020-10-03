const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    slides:Array,
    news_description:String,
    about_us_description:String,
    aboutUsBusinessCard:{
        name:String,
        title:String,
        description:String,
        image:String
    },
    companyInfo:
    {
        companyName:String,
        companyPhone:String,
        companyEmail:String,
        companyDescription:String,
        companyAddress:String,
        companyCity:String,
        companyCountry:String,
        companyPostalCode:String,
        companyLogo:String
    },
    newsPageLimit:{type:Number,min:1},
    caseDisplayRow:{type:Number,min:1}
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});


module.exports = mongoose.model('Setting', schema);