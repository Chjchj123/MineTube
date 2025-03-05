const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Song = new Schema({
    name:{type: String},
    description:{type: String},
    author:{type: String},
    image:{type: String},
    videoId: { type: String , require: true },
    slug: { type: String, slug: 'name'},
    uploadBy: { type: String },
    onPlayList: { type: Boolean, default: false},
},{
    timestamps: true
});


// plugin
mongoose.plugin(slug);
Song.plugin(mongooseDelete);
Song.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: true });

module.exports = mongoose.model('Song', Song);