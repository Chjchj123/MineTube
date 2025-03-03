
const Song = require('../models/song');
const User = require('../models/users');
const jwt = require('jsonwebtoken');


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

}

module.exports = new MeController;