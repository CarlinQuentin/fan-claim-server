require('dotenv').config();

let express = require('express');
let app = express();
const sequelize = require('./db')
const user = require('./controllers/usercontroller')
const bodyParser = require('body-parser')


sequelize.sync();

app.use(bodyParser.json());

app.use(require('./middleware/header'))

app.use('/user', user)



app.listen(3000, function(){
    console.log('app is listening on port 3000')
})


