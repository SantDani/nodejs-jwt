const router = require('express').Router();
const User = require('../models/User');

const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(200).required().email(),
    password: Joi.string().min(6).max(100).required()
})

router.post('/register', async(req, res) => {

    let passwordHash = '';
    try{
        const { error } = schemaRegister.validate(req.body)
    
        if (error) {
            // console.log('log - ', error.details[0].message);
            return res.status(400).json(
                {error: error.details[0].message}
            )
        }

        // unique email
        const isEmailExist = await User.findOne({email: req.body.email});

        if(isEmailExist){
            return res.status(400).json({ error: 'Email is registred'});
        }

        // hash password

        const salt = await bcrypt.genSalt(15);
        passwordHash =  await bcrypt.hash(req.body.password, salt);

    }catch(e){
        console.error(e);
    }

    
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: passwordHash
        });
    
        // console.log('BODY', req.body);

        
        const saveduser = await user.save();
        res.json({
            error: null,
            data: saveduser
        });
    }catch (e) {
        console.error(e)
        res.status(400).json({e, message: 'error register'});
    }
    
    // TODO Fix server down when someone dont send data correct
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(200).required().email(),
    password: Joi.string().min(6).max(100).required()
})

router.post('/login', async(req, res) => {
    
    // validate
    const {error} = schemaLogin.validate(req.body);
    if(error) {
        return res.status(400).json({error: error.details[0].message});
    }

    const user = await User.findOne({email: req.body.email});
    // console.log(user);
    if(!user){
        return res.status(400).json({error: 'user not found'});
    }

    const validPassowrd = await bcrypt.compare(req.body.password, user.password);
    if(!validPassowrd){ 
        return res.status(400).json({error: 'incorrect password'});
    }

    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).json({
        error: null,
        message: 'Login corrrect. User is Log in.',
        data: {token}
    });
})


module.exports = router;
