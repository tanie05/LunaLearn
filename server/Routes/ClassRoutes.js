const router = require('express').Router()
const mongoose = require('mongoose');
const Class = require('../Models/ClassModel')
const shortid = require('shortid');
const requireLogin = require('../Middleware/requireLogin')
const User = require('../Models/UserModel')
const Content = require('../Models/ContentModel');
const { clearScreenDown } = require('readline');

// create a class
router.post('/createclass', requireLogin, async (req,res) => {
    
    try{
        const teacher = req.user._id;
        const {title, description} = req.body;
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
        if (!mongoose.Types.ObjectId.isValid(classId)) {
            return res.status(400).json({ error: 'Invalid classId' });
        }

        const classroom = await Class.findById(classId);

        const contents = await Content.find({ classId });

        res.json({ class: classroom, content: contents });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// View all classes
router.get("/", requireLogin, async (req, res) => {
    const userId = req.user._id
    const user = await User.findById(userId)

    try {
        let classes;

        if(user.role === "Teacher") {
            classes = await Class.find({ teacher: userId })
        }
        else {
            classes = await Class.find({})
        }

        res.json({ classes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error' })
    }
})


// Edit a class
router.put('/edit/:classId', requireLogin, async (req, res) => {
    const classId = req.params.classId

    const { title, description } = req.body;

    
    try {
        const existingClass = await Class.findById(classId);
        if (!existingClass) {
          return res.status(404).json({ error: 'Class not found' });
        }
    
        if(title) {
            existingClass.title = title;
        }
        
        if(description) {
            existingClass.description = description;
        }
    
        await existingClass.save();
    
        res.json({success: true, message: 'Class updated successfully', updatedClass: existingClass });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
})


// Delete a class
router.put('/delete/:classId', requireLogin, async (req, res) => {
    const classId = req.params.classId

    try {
        const existingClass = await Class.findById(classId);
        if (!existingClass) {
          return res.status(404).json({ error: 'Class not found' });
        }
        await Class.deleteOne({ _id: classId });
    
        res.json({ message: 'Class deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
})


module.exports = router;