const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

const User = new Schema({
    name:{ type: String },
    username:{type: String, require: true, unique: true},
    password:{type: String, require: true},
    avatar:{type: String, default: "1741150547631-476578425_970712731221915_7071582858846951356_n.jpg"},
    nickname:{type: String, default: "NODEJS KHỦNG"},
    bio:{type: String, default:"Tao Đang Điên"},
    slug: { type: String, slug: 'username'},
},{
    timestamps: true
});


// plugin
mongoose.plugin(slug);

module.exports = mongoose.model('User', User);