// user Auth Api

import express from "express"

import { userAuthCont } from "../../Controllers/authController.js"
import userValidatMW from "../../Middleware/userValidMW.js"

const userAuthApis = express.Router()

userAuthApis.post("/login",userValidatMW ,userAuthCont)

export default userAuthApis

