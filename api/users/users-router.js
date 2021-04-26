const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../../config/secret.js');
const Users = require('./users-model.js');
const mw = require('../middleware/middleware.js');

module.exports = router


// registers new user and hashes password, then returns new user object with hashed password
router.post('/register', mw.checkCredentials, mw.checkUserIsUnique, mw.checkUserType,  (req,res,next) => {
    let user = req.body;

    const rounds = process.env.BRCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(user.password, rounds);

    user.password = hash

    Users.add(user)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(next)
})

router.post('/login', mw.checkCredentials, mw.checkUserExists, (req,res,next) => {
    let {username, password} = req.body;

    Users.findByUsername(username)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)){
                const token = makeToken(user)
                res.status(200).json({
                    user,
                    token
                })
            }else{
                res.status(401).json(`password does not match with user`)
            }
        })
        .catch(next)
})

function makeToken(user){
    const payload = {
      subject: user.id,
      username: user.username
    }
    const options = {
      expiresIn: '60m'
    }
    return jwt.sign(payload,jwtSecret,options)
  }