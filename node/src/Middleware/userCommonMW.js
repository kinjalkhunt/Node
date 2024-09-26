const userCommonMW = (req, res,next)=>{
    try {
        if(!(req.body.password === req.body.cpassword)){
            res.status(400).send({
                status:400,
                message:"password is not same"
            })
            return
        }
        next()
    } catch (error) {
        res.status(500).send({
            from:userCommonMW,
            message:"user common middleware"
        })
        
    }
}
export default userCommonMW