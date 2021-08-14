const router = require('express').Router();

router.post('/register', async(req, res) => {

    res.json({
        error: null,
        data: 'Here will be the data'
    })
})

module.exports = router;