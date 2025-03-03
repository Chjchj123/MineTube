const Song = require('../models/song');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
class SitesController{

    // GET home 
    async index(req, res, next) {
        try {
            const searchQuery = req.query.q || '';
            const refreshToken = req.cookies.refreshToken;
            const data = await Song.find({ name: { $regex: searchQuery, $options: 'i' } }).lean();
            var userId;
            jwt.verify(refreshToken, "dqa20062004", (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Invalid refresh token" });
                }
                userId = decoded.id;
            });
            const user = await User.findOne({ _id: userId}).lean();
            res.render('home', { data, user});
        } catch (error) {
            next(error);
        }
    }   

    // GET /search
    async search(req, res){
        try {
            const searchQuery = req.query.q || '';
            const data = await Song.find({ name: { $regex: searchQuery, $options: 'i' } }).lean();
    
            // Render danh sách bài hát dưới dạng HTML, không render toàn bộ trang
            let resultHtml = data.map(song => `<p>${song.name}</p>`).join('');
            res.render('searchInput', {layout: false, data});
        } catch (error) {
            res.status(500).send('Lỗi server');
        }
    }

}

module.exports = new SitesController;