const router = require('express').Router()
const sequelize = require('../db').import('../models/item')
const validateSession = require('../middleware/validate-session')

router.post('/create', validateSession, (req,res) => {
    sequelize.create({
        itemName: req.body.itemName,
        price: req.body.price,
        details: req.body.details,
        creator: req.user.id 
    }).then(
        function createSuccess(item){
            res.json({
                item: item,
                message: 'Item created'
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})

router.get('/find/own', validateSession, (req, res) => {
    sequelize.findAll({where: {creator: req.user.id} } )
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({error: err} ) )
})

router.get('/find/all', validateSession, (req, res) => {
    if(req.user.day == 'night'){
        sequelize.findAll()
        .then(item => {res.status(200).json(item)})
        .catch(err => res.status(500).json({error: err}))
    }
})

router.put('/update/:id', validateSession, (req, res) => {
    sequelize.findOne({where: {id: req.params.id } } ).then(item => {
        if(item.creator === req.user.id){
            sequelize.update(req.body, {where: {id: req.params.id } } )
            .then(item => res.status(200).json(item))
            .catch(err => res.json(req.error));
        } else {
            res.status(500).json({
                message: 'User does not own this item'
            });
        }
    });
});

router.delete('/delete/:id', validateSession, (req, res) => {
    sequelize.findOne({where: {id: req.params.id } } ).then(item => {
        if(item.creator === req.user.id){
            sequelize.destroy({where: {id: req.params.id } } )
            .then(item => res.status(200).json(item))
            .catch(err => res.json(req.error));
        } else {
            res.status(500).json({
                message: 'User does not own this item'
            });
        }
    });
});



module.exports = router