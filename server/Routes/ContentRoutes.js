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


// View single content
router.get('/:contentId', requireLogin, async (req, res) => {
    const contentId = req.params.contentId

    try {
        const content = await Content.findById(contentId)

        if(!content) {
            res.status(400).json({ error: 'Invalid content Id' })
        }
        else {
            res.json({ content: content })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json('Server error')
    }
})


// Updating content
router.put('/edit/:contentId', requireLogin, async (req, res) => {
    const contentId = req.params.contentId

    const { description, media } = req.body;

    try {
        const existingContent = await Content.findById(contentId)

        if(!existingContent) {
            res.status(404).json({ error: 'Content not found' })
        }

        if(media) {
            existingContent.media = media;
        }
        if(description) {
            existingContent.description = description;
        }

        await existingContent.save();

        res.json({ message: "Content updated successfully", updatedContent: existingContent });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error' })
    }
})


// Deleting content
router.put('/delete/:contentId', requireLogin, async (req, res) => {
    const contentId = req.params.contentId

    try {
        const existingContent = await Content.findById(contentId)

        if(!existingContent) {
            res.status(404).json({ error: "Content not found" })
        }

        await Content.deleteOne({ _id: contentId });

        res.json({ message: "Content deleted succesfully" })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' })
    }
})


module.exports = router;