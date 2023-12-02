const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET
const Token = require("../Models/Token")
const crypto = require('crypto')
const SendEmail = require("../Utils/SendEmail")


router.post("/signup", async (req, res) => {
    const { username, email, password, profileImage, role } = req.body;
    
    try {
        if (!username || !email || !password) {
            return res.status(422).json({ Error: "Please add all the fields" });
        }

        const savedUser = await User.findOne({ email });

        if (savedUser) {
            return res.status(422).json({ Error: "User already exists with that email" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await new User({
            username,
            email,
            password: hashedPassword,
            profileImage,
            role
        }).save();

        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save();

        console.log(token.token);

        const url = `${process.env.BASE_URL}/auth/${user._id}/verify/${token.token}`;
        await SendEmail(user.email, "Verify Email", url);

        res.status(201).json({ Message: "An email sent to your account. Please verify" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ Error: "Internal Server Error" });
    }
});


// router.post("/signup", (req, res) => {
//     const {username, email, password, profileImage, role} = req.body
//     if(!username || !email || !password) {
//         return res.status(422).json({Error: "Please add all the fields"})
//     }

//     User.findOne({email: email})
//     .then((savedUser) => {
//         if(savedUser) {
//             return res.status(422).json({Error: "User already exists with that email"})
//         }

//         bcrypt.hash(password, 12)
//         .then(hashedPassword => {
//             const user = new User({
//                 username,
//                 email,
//                 password: hashedPassword,
//                 profileImage,
//                 role
//             })
//             .save()
//             .then((user) => {
//                 const token = new Token({
//                     userId: user._id,
//                     token: crypto.randomBytes(32).toString("hex")
//                 }).save()

//                 console.log(token.token);
    
//                 const url = `${process.env.BASE_URL}/${user._id}/verify/${token.token}`
    
//                 SendEmail(user.email, "Verify Email", url);
    
//                 res.status(201).json({Message: "An email sent to your account. Please verify"})
//             })
//         })
//     })
//     .catch(err => {
//         console.log(err)
//     })
// })

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

// router.get("/:id/verify/:token", async (req, res) => {
// 	try {
// 		const user = await User.findOne({ _id: req.params.id });
// 		if (!user) return res.status(400).send({ Message: "Invalid link" });

// 		const token = await Token.findOne({
// 			userId: user._id,
// 			token: req.params.token,
// 		});
// 		if (!token) return res.status(400).send({ Message: "Invalid link" });

// 		await User.updateOne({ _id: user._id, verified: true });
// 		await token.remove();

// 		res.status(200).send({ Message: "Email verified successfully" });
// 	} catch (error) {
// 		res.status(500).send({ Error: "Internal Server Error......" });
// 	}
// });

router.get("/:id/verify/:token", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        const token = await Token.findOne({ userId: user._id, token: req.params.token });

        console.log(req.params.token);
        console.log(user);
        console.log(token);

        if (!user || !token) {
            return res.status(400).send({ Message: "Invalid link" });
        }

        await User.updateOne({ _id: user._id }, { verified: true });
        // const deletedToken = await Token.deleteOne({ userId: user._id, token: req.params.token });

        res.status(200).send({ Message: "Email verified successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ Error: "Internal Server Error" });
    }
});



module.exports = router