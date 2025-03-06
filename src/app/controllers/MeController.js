
const Song = require('../models/song');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const multer = require("multer");
const path = require("path");

class MeController{

    // GET show 
    async show(req, res, next){
        try {
            const refreshToken = req.cookies.refreshToken;
            var userId;
            jwt.verify(refreshToken, "dqa20062004", (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Invalid refresh token" });
                }
                userId = decoded.id;
            });
            const user = await User.findOne({ _id: userId}).lean();
            const data = await Song.find({ uploadBy: user.username }).lean();
            res.render('me/mySong', { data , user});
        } catch (error) {
            next(error);
        }
    }

    // [GET]
    async deletedSongList(req, res, next){
        try {
            const refreshToken = req.cookies.refreshToken;
            var userId;
            jwt.verify(refreshToken, "dqa20062004", (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Invalid refresh token" });
                }
                userId = decoded.id;
            });
            const user = await User.findOne({ _id: userId}).lean();
            const data = await Song.findWithDeleted({ deleted: true, uploadBy: user.username }).lean();
            const dataBinCount = await Song.countDocumentsWithDeleted({ deleted: true}).lean(); 
            res.render('me/deletedSongList', { data, dataBinCount, user});
        } catch (error) {
            next(error);
        }
    }
    // [PATH] Restore
    async restoreSongList(req, res, next){
        try {
            await Song.restore({ slug: req.params.slug }).lean();
            res.redirect('back');
        } catch (error) {
            next(error);
        }
    }

    // [DELETE]
    async hardDelete(req, res, next){
        try {
            await Song.findOneAndDelete({slug: req.params.slug }).lean();
            res.redirect('back');
        } catch (error) {
            next(error);
        }
    }

    async getProfile(req, res, next){
        try {
            const refreshToken = req.cookies.refreshToken;
            var userId;
            jwt.verify(refreshToken, "dqa20062004", (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Invalid refresh token" });
                }
                userId = decoded.id;
            });
            const user = await User.findOne({ _id: userId}).lean();
            const data = await Song.find({uploadBy: user.username}).lean();
            res.render('me/profiles', {user, data});
        } catch (error) {
            next(error);
        }
    }

    async updateAvatar(req, res, next){
        try {
            if (!req.file) {
                return res.status(400).send("No file uploaded.");
            }
            const refreshToken = req.cookies.refreshToken;
            var userId;
            jwt.verify(refreshToken, "dqa20062004", (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Invalid refresh token" });
                }
                userId = decoded.id;
            });
            const user = await User.findOne({ _id: userId}).lean();
            const userAvt = await User.findOne({ _id: userId});
            userAvt.avatar = req.file.filename;
            await userAvt.save();
            res.redirect(`your-profile/${user.slug}`);
        } catch (error) {
            next(error);
        }
    }

    async showProfile(req, res, next){
        try {
            const dataSongSlug = await Song.findOne({ uploadBy: req.params.slug}).lean();
            const userTarget = await User.findOne({ username: dataSongSlug.uploadBy}).lean();
            const refreshToken = req.cookies.refreshToken;
            var userId;
            jwt.verify(refreshToken, "dqa20062004", (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Invalid refresh token" });
                }
                userId = decoded.id;
            });
            const user = await User.findOne({ _id: userId}).lean();
            const data = await Song.find({uploadBy: user.username}).lean();

            res.render('me/userProfile', {userTarget ,user, data});
        } catch (error) {
            next(error);
        }
    }
    
    async editProfile(req, res, next){
        try {
            const refreshToken = req.cookies.refreshToken;
            var userId;
            jwt.verify(refreshToken, "dqa20062004", (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Invalid refresh token" });
                }
                userId = decoded.id;
            });
            const user = await User.findOne({ _id: userId}).lean();
            const data = await User.findOne({_id: req.params._id}).lean();
            res.render('me/editProfile', {data, user});
        } catch (error) {
            next(error);
        }
    }

    async updatedProfile(req, res, next){
        try {
            const user = await User.updateOne( { _id: req.params._id } , req.body);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new MeController;