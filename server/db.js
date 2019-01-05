const Sequelize = require('sequelize');

const sequelize = new Sequelize ('fanClaim', 'postgres', '@Pr0l1f31z', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('it worked')
    },
    function(err){
        console.log(err)
    }
);

module.exports = sequelize;