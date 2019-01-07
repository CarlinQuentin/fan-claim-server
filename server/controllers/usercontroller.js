const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../db').import('../models/user')
const validatesession = require('../middleware/validate-session')


router.post('/signup', (req, res) => {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({id: params.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
            console.log(token)

            res.json({
                user: user,
                message: 'user created',
                sessionToken: token
            })
        },
        createError = err => res.send(500, err.message)
    )
})
router.post('/signin', (req, res) => {
    User.findOne({ where: {email: req.body.email } } )
    .then(
        user => {
            if(user) {
                bcrypt.compare(req.body.password, user.password, (err, matches) => {
                    if (matches) {
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
                        res.json({
                            user: user,
                            message: 'It worked!!!',
                            sessionToken: token
                        })
                    } else {
                        res.status(502).send({error: 'bad gateway'})
                    }
                })
            } else {
                res.status(500).send({error: 'failed to authenticate'})
            }
        },
        err => res.status(501).send({error: 'failed to process'})
    )
})

router.get('/findall', validatesession, (req, res) => {
    User.findAll()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({error: err}))
})

router.get('/findone', validatesession, (req, res) => {
    User.findOne({where: {id: req.user.id} } )
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({error: err}))
})

router.delete('/', validatesession, (req, res) => {
    if(!req.errors) {
        User.destroy({where: {id: req.useron.id} } )
        .then(user => res.status (200).json(user))
        .catch(err => res.json(req.error))
    } else {
        res.status(500).json(req.error)
    }
})
router.put('/update/:id', validatesession, (req, res) => {
    if(!req.errors) {
        User.update(req.body, {where: {id: req.user.id} } )
        .then(user => res.status (200).json(user))
        .catch(err => res.json(req.error))
    } else {
        res.status(500).json(req.error)
    }
})

module.exports = router;