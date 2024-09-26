1// user update api
import express from 'express'


import userAuthValidMW from '../../Middleware/userAuthMW.js'
import userDisbandMW from '../../Middleware/userDisbandMW.js'
import { userCreateCont, userGetDataAllCont } from '../../Controllers/userCreationCont.js'
import userValidatMW from '../../Middleware/userValidMW.js'
import callApi from '../../Controllers/callApi.js'


const userApi = express.Router()
userApi.post('/getdata', callApi)
userApi.post('/create',userValidatMW ,userCreateCont)
userApi.get('/getall',userAuthValidMW, userGetDataAllCont)
userApi.get("/data/single/:id", (req,res) =>{
    try {
        
    } catch (error) {
        
    }
})

userApi.patch('/disband/all',userDisbandMW,(req,res) =>{
    try {
        
    } catch (error) {
        
    }
})
userApi.delete('/delete/all',(req,res) =>{
    try {
        
    } catch (error) {
        
    }
})



export default userApi