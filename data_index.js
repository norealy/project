
const models = require('./models');
const User = models.User;
const Post = models.Post;
const Permission = models.Permission;

// Permission.create({
//     name: "Admin",
//     nb_per: 0
// }
// )
// .then((per) => {
//         console.log("per : " + per.get())
// })
// .catch((err) => {
//     console.log("Error : ", err)
// })
// Permission.create({
//     name: "Number",
//     nb_per: 1
// }
// )
// .then((per) => {
//         console.log("per : " + per.get())
// })
// .catch((err) => {
//     console.log("Error : ", err)
// })
// ===================================================================
// User.create({
//     fullname:"Nguyen Thanh Nam",
//     username: "admintrators",
//     password: 'admin',
//     email:"admintrators@gmail.com",
//     images: "https://znews-photo.zadn.vn/",
//     permission: 0
// })
// .then((new1) => {
//     console.log(new1.get()) //{plain:true}
// })
// .catch((err) => {
//     console.log("Error : ", err)
// })
// User.create({
//     fullname:"Tran thanh Long",
//     username: "numberOne",
//     password: '123456',
//     email:"numberOne@gmail.com",
//     images: "https://znews-photo.zadn.vn/",
//     permission: 1
// })
// .then((new1) => {
//     console.log(new1.get()) //{plain:true}
// })
// .catch((err) => {
//     console.log("Error : ", err)
// })
// User.create({
//     fullname:"Nguyen Van Dat",
//     username: "numberTWO",
//     password: '123456',
//     email:"numberTWO@gmail.com",
//     images: "https://znews-photo.zadn.vn/",
//     permission: 1
// })
// .then((new1) => {
//     console.log(new1.get()) //{plain:true}
// })
// .catch((err) => {
//     console.log("Error : ", err)
// })
// // ===================================================================

Post.create({
    id_user: 4,
    images: "https://znews-photo.zadn.vn/",
    title: "Tille2",
    content: "Content2",
    tag : "Lap trinh"
})
.then((new1) => {
    console.log(new1.get())
})
.catch((err) => {
    console.log("Error : ", err)
})
Post.create({
    id_user: 5,
    images: "https://znews-photo.zadn.vn/",
    title: "Tille2",
    content: "Content2",
    tag : "Khoa hoc"
})
.then((new1) => {
    console.log(new1.get())
})
.catch((err) => {
    console.log("Error : ", err)
})