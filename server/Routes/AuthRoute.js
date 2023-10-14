const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET


router.post("/signup", (req, res) => {
    const {username, email, password, profileImage, role} = req.body
    if(!username || !email || !password) {
        return res.status(422).json({Error: "Please add all the fields"})
    }

    User.findOne({email: email})
    .then((savedUser) => {
        if(savedUser) {
            return res.status(422).json({Error: "User already exists with that email"})
        }

        bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                username,
                email,
                password: hashedPassword,
                profileImage,
                role
            })
    
            user.save()
            .then(user => {
                res.json({Message: "Saved Successfully"})
            })
            .catch(err => {
                console.log(err)
            })
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/signin", (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        return res.status(422).json({Error: "Please add email or password"})
    }

    User.findOne({email: email})
    .then(savedUser => {
        if(!savedUser) {
            return res.status(422).json({Error: "Invalid email or password"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if(doMatch) {
                //res.json({Message: "Successfully signed in"})
                const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
                const {_id, email, username, profileImage, role} = savedUser
                res.json({token, user: {_id, email, username, profileImage, role}})
            }
            else {
                return res.status(422).json({Error: "Invalid email or password"})
            }
        })
        .catch(err => {
            console.log(err);
        })
    })
})

module.exports = router