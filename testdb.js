const sequelize =  require('sequelize')

const db = new sequelize({
    database: 'blogdb',
    username:'postgres',
    password:'Claydeptrai001',
    host: 'localhost',
    port:5432,
    dialect: 'postgres',
    dialectOptions:{
        ssl: false
    }
})

db.authenticate()
.then(()=>{console.log("Success ~!")})
.catch((err) => {
    console.log(err);   
})