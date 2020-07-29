const express = require('express');
const authControl = require('../controller/auth.controller')
const postControl = require('../controller/post.controller')
const post = require('../controller/post')
var multer  = require('multer')
var upload = multer({ dest: './public/uploads/' })

const route = express.Router()

route.get('/me', authControl.checkCookie,post.loadPost,postControl.getPost);
route.post('/me',upload.single('images') ,postControl.postPost);

route.get('/tag',post.loadPostTag,postControl.getTag);
module.exports = route