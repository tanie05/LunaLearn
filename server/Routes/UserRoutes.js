const router = require('express').Router()
const requireLogin = require('../Middleware/requireLogin')
const User = require('../Models/UserModel')


router.get('/:userId', requireLogin, async (req, res) => {
    const userId = req.params.userId

    try {
        const user = await User.findById(userId)

        res.json({ user })
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error' })
    }
})


module.exports = router;