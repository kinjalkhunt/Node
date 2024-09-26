const yearMw = (req, res, next) =>{
try {

    if( req.body['year']  >  new Date().getFullYear()){
        res.send("error")
    
    }
    console.log("successfull message");
        next();
} catch (error) {
    console.log("error");
    next(error)
}


}
export default yearMw;