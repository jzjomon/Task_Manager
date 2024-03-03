const USER = require("../models/user.js");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signUp = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body.details;
        if (firstname && lastname && email  && password) {
            const exist = await USER.findOne({ email: email });
            if (exist) return res.status(400).json({ message: "allready have an account !" });
            bcrypt.hash(password, parseInt(process.env.SALT), async (err, hash) => {
                if (err) return res.status(400).json({ message: "hashing error" });
                const result = await USER({ firstname, lastname, email, password: hash }).save();
                if (!result) return res.status(400).json({ message: "cannot save the user details" });
                res.status(200).json({ message: "successfully saved the user details", data :result });
            })
        } else {
            return res.status(400).json({ message: "validation error" });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const signIn = (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "validation failed" });
        USER.findOne({ email }).then((user) => {
            if (!user) return res.status(400).json({ message: "You don't have an account. Please sign up !" });
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) return res.status(400).json({ message: "bcrypt compare failed" });
                if (!result) return res.status(400).json({ message: "incorrect password" });
                jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`, (err, token) => {
                    if (err) return res.status(400).json({ message: "Something went wrong !" });
                    res.status(200).json({ message: "success", data: user, token });
                })
            })
        }).catch((err) => {
            res.status(400).json({ message: "Something went wrong !"});
        });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })

    }
}


module.exports = { signIn, signUp}