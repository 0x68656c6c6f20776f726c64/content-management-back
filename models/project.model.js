const mongoose = require('mongoose');
const app_settings = require('./../appSettings.json');
const Schema = mongoose.Schema;

const schema = new Schema({
    projectId: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    category: { type: String, required: true },
    hot:{type: Boolean, default: false},
    disabled: { type: Boolean, default: true},
    image:{type:String,default:app_settings.api_Url+'/pictures/default'},
    description:{type:String,default:""},
    content:{type:String,default:"<p></p>"},
    projectFlow:[
        {
            title:String,
            content:String
        }
    ],
    projectRequirement:{type:String,default:"<p></p>"},
    projectFee:[
        {
            title:String,
            amount:Number
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

// schema.virtual('title').get(function(){
//     return {
//         projectId: this.projectId,
//         title: this.title,
//         subtitle: this.subtitle,
//         category: this.category,
//         hot:this.hot,
//         disabled: this.disabled,
//         image:this.image,
//         description:this.description
//     }
// })

module.exports = mongoose.model('Project', schema);