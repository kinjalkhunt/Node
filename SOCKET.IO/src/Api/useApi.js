// import express from "express";
// import userModel from "../Model/userModel";

// const userRouter = express.Router()

// userRouter.post("/create/user", async (req, res)=> {
//     try {
//         const userName = req.body.name
//         const userEmail = req.body.email
//         const userPass = req.body.password

//         const dataModel = new userModel({
//             name: userName,
//             email: userEmail,
//             password: userPass
//         })

//         const savedData = await dataModel.save()

//         res.status(200).send(savedData)

//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

// userRouter.get("/user/check/:userEmail", async (req, res) => {
//     try {
//         const userEmail = req.params.userEmail

//         const userData = await userModel.find({
//             email: userEmail
//         })

//         if(!userData.length) {
//             res.status(400).send({
//                 error: "user doesn't exist"
//             })
//         }

//         res.send({
//             userDetails: userData[0]
//         })

//     } catch (error) {
//         res.status(400).send({
//             error
//         })
//     }
// })

// export default userRouter

import express from "express";
import userModel from "../Model/userModel.js";

const userRouter = express.Router();

userRouter.post("/create/user", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ error: "All fields are required" });
        }

        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).send({ error: "User already exists" });
        }

        const newUser = new userModel({ name, email, password });
        const savedData = await newUser.save();
        res.status(201).send(savedData);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

userRouter.get("/user/check/:userEmail", async (req, res) => {
    try {
        const { userEmail } = req.params;

        const user = await userModel.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).send({ error: "User doesn't exist" });
        }

        res.send({ userDetails: user });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

export default userRouter;
