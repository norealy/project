const body = require('body-parser')
const models = require('../models')
const user = require('../models/user')
const User = models.User
const Post = models.Post
module.exports.getAccount = function (req,res) {
    res.render('auth/login');
}
module.exports.getRegister = function (req,res) {
    res.render('auth/register');
}
module.exports.postAccount = function (req,res) {
    let passw = req.body.password
    let email = req.body.email
    User.findOne({ where: { email: email } }
    ).then((acc)=>{
        if (passw === acc.get().password) {
            console.log("Login success ~!")

            pushSession(req,res,acc)
            .then((resole)=>{req.session.post = resole
                // console.log(req.session.post)
                return res.render('post/mypost', {user: req.session.user || "",post: req.session.post || ""});
            })
            .catch((reject)=>console.log("error" + reject))
        }
        else {
            return res.render('auth/login',{errors :
                "Wrong password"
            });
        }
    })
    .catch((err) => {
        return res.render('auth/login',{errors :
            "Wrong username"
        });
    })
}

module.exports.postRegister = (req,res) => {
    let passw = req.body.password
    let email = req.body.email
    let username = req.body.username
    let fullname = req.body.fullname
    if(passw && email){
        User.create({
            fullname: fullname,
            username: username,
            password: passw,
            email: email,
            images: "https://znews-photo.zadn.vn/",
            permission: 1
        }).then((acc)=>{
            // console.log(acc.get())
            console.log("Register success ~!")
            res.cookie('user-id-cookie' , acc.get().username ,{signed: true})

            pushSession(req,res,acc)
            .then((resole)=>req.session.post = resole)
            .catch((reject)=>console.log(reject+"error"))
            // console.log(req.session.post)
            return res.render('post/mypost', {user: req.session.user || "",post: req.session.post || ""});
        })
        .catch((err) => {
            return res.render('auth/register',{errors :
                "Email already in use ~! Pls Try it ~~!"
            });
        })
    }else{
        return res.render('auth/register',{errors :
            "Email and password null ~!"
        });
    }
}

module.exports.checkCookie = function(req,res,next){
    let errors = []
    if(!req.session.user){
        errors.push("You must login ~!")
        res.redirect('/auth/login');
        return;
    }else{
        next();
    }
}

let pushSession = (req,res,acc) => {
    return new Promise((resole,reject)=>{
        res.cookie('user-id-cookie' , acc.get().username ,{signed: true})
        req.session.user = {
            id: acc.get().id,
            fullname: acc.get().fullname,
            username: acc.get().username,
            password: acc.get().password,
            email: acc.get().email,
            images: acc.get().images,
            permission: acc.get().permission,
            date: acc.get().createdAt
        }
        Post.findAll({
            where: { id_user: acc.get().id }
          })
        .then((posts) => {
            var arrposts = [];
            console.log("Session ~!")
            posts.forEach(post => {
                arrposts.push({post:{
                    id: post.get().id,
                    id_user: post.get().id_user,
                    images: post.get().images,
                    title: post.get().title,
                    content: post.get().content,
                    tag: post.get().tag,
                    createdAt: post.get().createdAt
                }})
            });
            resole(arrposts)
        })
        .catch((error)=>{
            console.log("Error fillAll " + error)
            reject("")
        })
    })
}