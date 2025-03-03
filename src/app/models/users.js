const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

const User = new Schema({
    name:{ type: String },
    username:{type: String, require: true, unique: true},
    password:{type: String, require: true},
    slug: { type: String, slug: 'username'},
},{
    timestamps: true
});


// plugin
mongoose.plugin(slug);

module.exports = mongoose.model('User', User);