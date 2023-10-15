const router = require('express').Router()
const requireLogin = require('../Middleware/requireLogin')
const Content = require('../Models/ContentModel')

// creating content
router.post('/', requireLogin, async (req,res) => {
    const {contentType, description, media, classId} = req.body;

    try{
        const newContent = await new Content({
            contentType, 
            description,
            media,
            classId
        }).save();
    
        res.json({ success: true, message: 'Content created successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    
});


module.exports = router;