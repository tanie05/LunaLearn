const router = require('express').Router()
const Class = require('../Models/ClassModel')
const shortid = require('shortid');
const requireLogin = require('../Middleware/requireLogin')
const User = require('../Models/UserModel')
const Content = require('../Models/ContentModel')

// create a class
router.post('/createclass', requireLogin, async (req,res) => {
    
    try{
        const teacher = req.user._id;
        const {title, description, coverImage} = req.body;
        const students = [];
        const code =  shortid.generate()

        const newClass = await new Class({
            teacher, 
            title,
            description,
            code,
            students,
        }).save();

        res.json({ success: true, message: 'Class created successfully'});

    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


// join a class

router.put('/join', requireLogin, async (req, res) => {
    const classCode = req.body.code;
    const userId = req.user._id;

    try {
        const foundClass = await Class.findOneAndUpdate(
            { code: classCode },
            { $push: { students: userId } },
            { new: true }
        );

        if (!foundClass) {
            return res.status(404).json({ error: 'Class not found' });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { classList: foundClass._id }},
            { new: true }
        );

        res.json({ 
            message: 'Successfully joined the class',
            updatedClass: foundClass,
            updatedUser: user
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
// leave a class
router.put('/leave', requireLogin, async (req, res) => {
    const classCode = req.body.code;
    const userId = req.user._id;

    try {
        const foundClass = await Class.findOneAndUpdate(
            { code: classCode },
            { $pull: { students: userId } },
            { new: true }
        );

        if (!foundClass) {
            return res.status(404).json({ error: 'Class not found' });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { classList: foundClass._id }},
            { new: true }
        );

        res.json({ 
            message: 'Successfully left the class',
            updatedClass: foundClass,
            updatedUser: user
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


// view a class
router.get('/:classId', requireLogin, async (req, res) => {
    const classId = req.params.classId;
    const userId = req.user._id;

    try {
        const classroom = await Class.findById(classId);

        if (!classroom || !classroom.students.includes(userId)) {
            return res.status(403).json({ error: 'You do not belong to this class' });
        }

        const contents = await Content.find({ classId });

        res.json(contents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});




module.exports = router;