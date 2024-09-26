const VersionValidMW = (res, req, next)=>{
    try {
        let version = req.headers.VERSION_VALIDATION_PORT;
        if(version === process.env.VERSION_VALIDATION_PORT)
            
        
        next()
    } catch (error) {
        res.status(400).send({
            from:VersionValidMW,
            error:error,
            message:"is not successfully update"
        })
        
    }
}
export default VersionValidMW;