const router = require('express').Router()
const requireLogin = require('../Middleware/requireLogin')
const Content = require('../Models/ContentModel')  
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });


router.post("/" ,upload.single("file"), async (req, res) => {
  
  const { description, contentType, classId } = req.body;
  const media = req.file ? req.file.filename : ""

  try {
    const newContent = await new Content({
            contentType, 
            description,
            media,
            classId
        }).save();
    res.send({ status: "ok" , success: true});
  } catch (error) {
    console.error('Error saving content to MongoDB:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/:classId",requireLogin, async (req, res) => {
  try {
    const classId = req.params.classId;

    Content.find({classId}).then((data) => {
      res.send({ status: "OK", data: data });
    });
  } catch (error) {}
});

// Updating content
router.put('/edit/:contentId',upload.single("file"),  async (req, res) => {
    const contentId = req.params.contentId

    const { description, contentType, classId } = req.body;
    const media = req.file ? req.file.filename : ""

    try {
        const existingContent = await Content.findById(contentId)

        if(!existingContent) {
            res.status(404).json({ error: 'Content not found' })
        }

        
        existingContent.media = media;
        
        if(description) {
            existingContent.description = description;
        }
        if(contentType){
            existingContent.contentType = contentType;
        }
        if(classId){
            existingContent.classId = classId;
        }
        
        await existingContent.save();

        res.json({success:true, message: "Content updated successfully", updatedContent: existingContent });
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

        res.json({success: true, message: "Content deleted succesfully" })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: 'Server error' })
    }
})


module.exports = router;