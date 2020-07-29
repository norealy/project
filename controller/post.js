const models = require('../models');
const body = require('body-parser');
const Post = models.Post;
const User = models.User;

const loadPost = async function(req, res, next){
    req.post = await Post.findAll({where:{id_user:req.session.user.id}})
    next()
    return
}
const loadPostTag = async function(req, res, next){
    // req.tag = req.body.tag
    let post1 = await Post.findAll({include:[{model: User, as: 'user'}]})
    let post2 = await Post.findAll({where:{tag:"Lap trinh"}})
    let users = []
    // console.log(req.post1)
    // console.log(req.post2)
    post2.forEach(element => {
        post1.forEach(post11 =>{
            if(element.id==post11.id){
                users.push(post11.user)
            }
        })
    })
    req.post = post2
    req.user = users
    // console.log(req.user)
    next()
    return
}
module.exports.loadPost = loadPost
module.exports.loadPostTag = loadPostTag
