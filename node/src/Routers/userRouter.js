import express from "express"
import userCommonMW from "../Middleware/userCommonMW.js"
import userApi from "../Apis/User/userApi.js"
import userAuthApis from "../Apis/AuthApi/userAuthApi.js"


const userRouter = express.Router()

userRouter.use('/auth', userAuthApis)
userRouter.use('/user',userCommonMW,userApi)


export default userRouter