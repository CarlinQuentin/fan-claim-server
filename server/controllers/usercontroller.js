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
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
            console.log(token)

            res.json({
                user: User({
                    firstName: User.firstName,
                    lastName: User.lastName,
                    userName: User.userName,
                    email: User.email
                }),
                message: 'user created',
                sessionToken: token
            })
        },
        creatError = err => res.send(500, err.message)
    )
})




module.exports = router;