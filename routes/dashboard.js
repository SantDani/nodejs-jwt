const router = require('express').Router();

router.get('/', (req, res) => {

    console.log('open dashboard', req.user);
    res.json({
        error: null,
        data: {
            title: 'my route protected',
            user: req.user
        }
    });
});

module.exports = router;