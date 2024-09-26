// create user Controller

import {  saltRoundConfigVar } from "../Configurations/baseConfig.js"
import userModel from "../Models/userModel.js"
import { createHashKey } from "../Services/hashing.js"

const userCreateCont = async (req, res) => {
    try {

        const hashedPassword = await createHashKey(req.body.password, saltRoundConfigVar)

        const dataPrepare = new userModel({...req.body, password: hashedPassword})

        const savedData = await dataPrepare.save()

        console.log("saved data === ", savedData);

        res.status(201).send({
            status: 201,
            message: "user successfully created",
            data: savedData
        })

    } catch (error) {
        res.status(404).send({
            ...error
        })
    }
}

const userGetDataAllCont = async (req, res) => {
    try { 
        const getData = await userModel.find({email: req.body.email})
        
        res.status(200).send({
            status: 200,
            data: getData
        })
    } catch(error) {

    }
}

export {userCreateCont, userGetDataAllCont}