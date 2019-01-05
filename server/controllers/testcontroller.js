const express = require('express')
const router = express.Router()
const sequelize = require('../db');

router.post('/one', function(req, res){

    res.send("Test one went through!") 

  });

router.get('/', function (req, res) {
  
    res.send('Hey!!! This is a test route!');
  
})


module.exports = router;