

// passwordMiddleware.js
const storePassword = (req, res, next) => {
    try {
        const userPassword = 'kinjal'

        if (req.body.password !== userPassword) {
            res.send("Password is required");
            console.log("invalid password");
        }

        next();
    } catch (error) {
        console.log("Error:", error);
    }
};

export default storePassword;
