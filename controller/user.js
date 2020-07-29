const models = require('../models');
const Post = models.Post;
const User = models.User;

const loadUser = async function(req, res, next){
    req.post = await Post.findAll({include:[{model: User, as: 'user'}]})
    // console.log(typeof req.post[0])
    let users = []
    req.post.forEach(element => {
        users.push(element.user)
    })
    req.user = users
    // console.log(req.user)
    next()
}
module.exports.loadUser = loadUser
