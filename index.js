require('dotenv').config()
const express = require('express');
const bodyParser =  require('body-parser');
let user = require('./controller/user')
let post = require('./controller/post')
const app = express()
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const Authroute = require('./route/auth.route')
const postRoute = require('./route/post.route')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cookieParser(process.env.SESSION_SECRET))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("./public"));
app.set('view engine', 'pug');
app.set('views', './views');

const port = process.env.PORT || 3000

app.use(session({
    name: 'session'
}))

app.get('/' ,user.loadUser,(req, res) => {
    res.render('index', {user: req.user || "",post: req.post})
});

app.use('/auth',Authroute);

app.use('/posts',postRoute)

app.use('/about',(req,res)=>{
    res.render('layouts/about');
})

app.listen(port, () => {
    console.log(`Server started on port : ${port}`);
});

