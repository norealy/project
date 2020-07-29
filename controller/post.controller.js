const body = require('body-parser')
const models = require('../models')
const User = models.User
const Post = models.Post

module.exports.getPost = function (req, res) {
    return res.render('post/mypost', {user: req.session.user || "",post: req.post || ""})
}
module.exports.getTag = function (req, res) {
    return res.render('post/posttag', {user: req.user || "",post: req.post})
}
module.exports.postPost = function (req, res) {
    let images = req.file.path.split('/').slice(1).join('/')
    if(!req.body.id || !req.body.title || !req.body.content){
        console.log(error)
        return res.render('post/mypost', {user: req.session.user || "",post: req.session.post || ""})
    }else{
        Post.create({
            id_user: req.body.id,
            images: images,
            title: req.body.title,
            content: req.body.content,
            tag : req.body.tag
        })
        .then(() => {
            console.log("Post success ~!")
            pushSession(req.body.id)
            .then((resole)=>req.session.post = resole)
            .catch((reject)=>console.log(reject+"error"))
            console.log("then............")
            return res.render('post/mypost', {user: req.session.user || "",post: req.session.post || ""});
        })
        .catch((err) => {
            console.log("Error : ", err)
        })
    }
    console.log("Else............")
    return res.render('post/mypost', {user: req.session.user || "",post: req.session.post || ""});
}

let pushSession = (id) => {
    return new Promise((resole,reject)=>{
        Post.findAll({
            where: { id_user: id }
          })
        .then((posts) => {
            var arrposts = [];
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