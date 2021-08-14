const router = require('express').Router();
const User = require('../models/User');

const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

router.post('/register', async(req, res) => {

    try{
        const { error } = schemaRegister.validate(req.body)
    
        if (error) {
            console.log('log - ', error.details[0].message);
            return res.status(400).json(
                {error: error.details[0].message}
            )
        }
    }catch(e){
        console.error(e);
    }

    
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
    
        // console.log('BODY', req.body);

        
        const saveduser = await user.save();
        res.json({
            error: null,
            data: saveduser
        });
    }catch (e) {
        console.error(e)
        res.status(400).json({e});
    }
    
    // TODO Fix server down when someone dont send data correct
})

module.exports = router;
