// require('dotenv').config();

let express = require('express');
let app = express();
const sequelize = require('./db')
const test = require('./controllers/testcontroller')


sequelize.sync();


app.listen(3000, function(){
    console.log('app is listening on port 3000')
})

app.use('/test', test)

