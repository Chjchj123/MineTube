const jwt = require('jsonwebtoken');

class middlewareController {

    verifyToken(req, res, next){
        const token = req.cookies.refreshToken;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(token, "dqa20062004", (err, user)=>{
                if(err){
                    res.json('Lỗi tại đây')
                    res.redirect('auth/login');
                }
                req.username = user;
                next();
            });
        }else{
            res.redirect('auth/login');
        }
    }

     
}


module.exports = new middlewareController;