/* eslint-disable import/named */
// eslint-disable-next-line no-unused-vars
import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "./models/usermodels";
import { generatetoken, isAuth } from "./utils";

// eslint-disable-next-line no-undef
const userrouter = express.Router();

 


userrouter.get('/createeadmin',expressAsyncHandler(async (req, res) => {
    // eslint-disable-next-line no-empty
    try {
        const user = new User({
            name: 'admin',
            email: 'admin@gmail.com',
            password: 'faaizalam', 
            isAdmin: true
        })
        const createdadmin = await user.save();
        res.send(createdadmin);


        // eslint-disable-next-line no-empty
    } catch (err) {
        res.status(404).send({ message: err.message })

    }

}))


userrouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({

        email: req.body.email,
        password: req.body.password

    })
    if (!user) {
        res.status(401).send({ message: 'invalid email or password' })

        // eslint-disable-next-line no-empty
    } else {
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generatetoken(user)

        })

    }

}))

userrouter.post('/register', expressAsyncHandler(async (req, res) => {
    const newuser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password

    })
    const createduser = await newuser.save()
    

    if (!createduser) {
        res.status(401).send({ message: 'invalid user data' })

        // eslint-disable-next-line no-empty
    } else {
        res.send({
            _id: createduser._id,
            name: createduser.name,
            email: createduser.email,
            isAdmin: createduser.isAdmin,
            token: generatetoken(createduser)

        })

    }

}))
userrouter.put('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)


    if (!user) {

        res.status(404).send({ message: 'invalid user data' })

        // eslint-disable-next-line no-empty
    } else {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        const updateduser = await user.save();
        res.send({
            _id: updateduser._id,
            name: updateduser.name,
            email: updateduser.email,
            isAdmin: updateduser.isAdmin,
            token: generatetoken(updateduser)

        })

    }

}))



export default userrouter;
