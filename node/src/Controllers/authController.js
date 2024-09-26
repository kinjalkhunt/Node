

import { algorithumForJWTConfig } from "../Configurations/baseConfig.js"
import userModel from "../Models/userModel.js"
import { verifyHashKey } from "../Services/hashing.js"

import { createJWT } from "../Services/jwtToken.js"


const userAuthCont = async (req, res) => {
    try {
        const getData = await userModel.find({email: req.body.email})

        if (getData.length === 0) {
            res.status(400).send({
                 status: 400,
                 error: "user doesn't exist"
            })
            return
        }

        const passwordVefication = await verifyHashKey(getData[0].password, req.body.password)

        console.log("password verification ==== ", passwordVefication);
    
        if (!passwordVefication) {
        
            res.status(401).send({
                status: 401,
                message: "invalid password"
            })

            return
        }
        
        console.log("get data === ", getData[0]);

        const jwToken = await createJWT(getData[0],algorithumForJWTConfig.user)

        console.log("user token ===> ", jwToken);

        if (!(jwToken.status === "success")) {
            res.status(400).send({
                status: 400,
                message: "jwt error",
                error: jwToken.error
            })

            return
        }

        res.cookie("authToken", jwToken.token)
        res.status(200).send({
            status: 200,
            message: "you're successfully logged in",
            token: jwToken.token
        })

    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

export {userAuthCont}