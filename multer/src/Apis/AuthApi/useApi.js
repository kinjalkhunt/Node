import express from "express";
import userModel from "../../Models/userModel.js";

const userRouter = express.Router()

userRouter.post("/create/user", async (req, res)=> {
    try {
        const userName = req.body.name
        const userEmail = req.body.email
        const userPass = req.body.password

        const dataModel = new userModel({
            name: userName,
            email: userEmail,
            password: userPass
        })

        const savedData = await dataModel.save()

        res.status(200).send(savedData)

    } catch (error) {
        res.status(400).send(error)
    }
})

userRouter.get("/user/check/:userEmail", async (req, res) => {
    try {
        const userEmail = req.params.userEmail

        const userData = await userModel.find({
            email: userEmail
        })
// console.log(userData);
        if(!userData.length) {
            res.status(400).send({
                error: "user doesn't exist"
            })
            return
        }

        res.send({
            userDetails: userData[0]
        })
        return
    } catch (error) {
        res.status(400).send({
            error,
            message: "something went wrong..."
        })
        return
    }
})

export default userRouter