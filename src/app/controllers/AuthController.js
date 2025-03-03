const user = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let refreshTokensArr = [];
class AuthController {

    async login(req, res, next){
        res.render('admin/auth', {layout: false});
    }

    register(req, res){
        res.render('admin/register', { layout: false});
    }

    async registerSubmit(req, res, next){
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            //
            const checkUserName = await user.findOne({ username: req.body.username});
            if(!checkUserName){
                const newUser = await new user({
                    name: req.body.playerName,
                    username: req.body.username,
                    password: hash,
                });
                const userSave = await newUser.save();
                res.redirect('/');
            }else{
                res.status(400).json('We already have that username');
            }
            
        } catch (error) {
            next(error)
        }
    }

    async loginSubmit(req, res, next){
        try {
            const username = await user.findOne({username: req.body.username}).lean();
            console.log(test.username);
            if(!username){
                res.json('Wrong Username');
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                username.password
            );
            if(validPassword && username){
                const accessToken = jwt.sign({
                    id: username._id,
                },
                "dqa0604",
                {
                    expiresIn: "9h"
                } 
                );
                const refreshToken = jwt.sign({
                    id: username._id,
                },
                "dqa20062004",
                {
                    expiresIn: "9h"
                } 
                );
                refreshTokensArr.push(refreshToken);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "true",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                    path: "/",
                });
                // res.json({username, accessToken});
                res.redirect('/');
            }else{
                res.redirect('back');
            }
        } catch (error) {
            next(error);
        }
    }

    async requestRefreshToken(req, res, next){
        try {
            const refreshTokenn = req.cookies.refreshToken;
            if (!refreshTokenn) {
                return res.status(401).json({ message: "No refresh token provided" });
            }
            if(!refreshTokensArr.includes(refreshTokenn)){
                return res.status(403).json("Error");
            }
            jwt.verify(refreshTokenn, "dqa20062004", (err, user)=>{
                if(err){
                    res.status(403).json("Token is not valid");
                }
                refreshTokensArr = refreshTokensArr.filter((token) => token !== refreshTokenn);
                const newAccessToken = jwt.sign({
                    id: user._id,
                },
                "dqa0604",
                {
                    expiresIn: "20s"
                } 
                );
                const newRefreshToken = jwt.sign({
                    id: user._id,
                },
                "dqa20062004",
                {
                    expiresIn: "9h"
                } 
                );
                refreshTokensArr.push(newRefreshToken);
                res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "true",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                    path: "/",
                });
                res.status(200).json({accessToken: newAccessToken });
            });
            
        } catch (error) {
            next(error);
        }
    }

    async userLogOut(req, res, next){
        res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "strict" });
        refreshTokensArr = refreshTokensArr.filter(token => token !== req.cookies.refreshToken);
        console.log(refreshTokensArr);
        res.redirect('login');
    }
}

module.exports = new AuthController;