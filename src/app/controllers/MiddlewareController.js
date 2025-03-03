const jwt = require('jsonwebtoken');

class middlewareController {

    verifyToken(req, res, next){
        const token = req.cookies.refreshToken;
        if(token){
            jwt.verify(token, "dqa20062004", (err, user)=>{
                if(err){
                    return res.redirect('auth/login');
                }
                req.username = user;
                next();
            });
        }else{
            console.error("JWT Verification Error:");
            res.redirect('auth/login');
        }
    }

     
}


module.exports = new middlewareController;