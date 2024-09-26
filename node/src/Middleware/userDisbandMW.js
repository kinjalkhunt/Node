function userDisbandMW(req, res, next) {
    try {
        console.log(" in user disband middleware ===> ", req.body);
        next()
    } catch (error) {
        res.send({
            from: "userDisbandMW",
            error
        })
    }
}

export default userDisbandMW