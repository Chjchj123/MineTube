const Song = require('../models/song');

class SitesController{

    // GET home 
    async index(req, res, next) {
        try {
            const searchQuery = req.query.q || '';
            const data = await Song.find({ name: { $regex: searchQuery, $options: 'i' } }).lean();
            res.render('home', { data });
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