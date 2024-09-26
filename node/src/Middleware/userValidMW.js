import emailValidator from "../Services/emailValidator.js";
import passValidator from "../Services/passvalidator.js";


function userValidatMW  (req,res,next){
    try {
        const emailVerification = emailValidator(req.body.email)
        if(!emailVerification.isValid){
            res.status(400).send({
                status:400,
                message:"user not created",
                error:emailVerification.reason
            })
            return
        }
        if(!(req.body.password === req.body.cpassword)){
            res.status(400).send({
                status:400,
                message:"user not created",
                error:"password and confirm password does not match"

            })
            return
        }
        const passVerification = passValidator(req.body.password)
        if(!(passVerification.isValid)){
            res.status(400).send({
                status:400,
                message:"user not creatnned",
                error:passVerification.reason
            })
            return
        }
        next()
    } catch (error) {

       res.send({
        status:500,
        message:"internal server error",
        error:error.reason
       }) 
    }
}
export default userValidatMW

// catch (error) {
//     res.send({
//         from: "userAuthMW",
//         error