import jwt from "jsonwebtoken"


const createJWT = async (payLoad, alg) => {
    try {
        const secretKey = process.env.JWT_KEY

        const jsonToken = await jwt.sign({...payLoad}, secretKey, {
            algorithm: alg,
            expiresIn: "10h"
        })
    
        return {status: "success", token: jsonToken}
    
    } catch (error) {
        console.log("error in jwt method === ", error);
        return {status: "failed", error}    
    }
}
 
const verifyJWT = async (token, alg) => {
    try {

        const secretKey = process.env.JWT_KEY
        const tokenVerification = await jwt.verify(token, secretKey, {
            algorithms: alg
        })

        console.log("token method ==> ", tokenVerification);

        return {isValid: true, data: tokenVerification}

    } catch (error) {
        console.log("verify jwt error === ", error);
        return {isValid: false, error}
    }
}

export {createJWT, verifyJWT}