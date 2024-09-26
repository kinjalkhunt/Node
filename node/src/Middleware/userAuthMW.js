import { algorithumForJWTConfig } from "../Configurations/baseConfig.js";
import { verifyJWT } from "../Services/jwtToken.js";
// import { algorithumForJWTConfig } from "../Configurations/baseConfig.js";

const userAuthValidMW = async (req, res, next) => {
    try {
        console.log("cookie ==> ", req.headers);

        let cookieJson = {}

        req.headers.cookie.split("; ").map((val, index) => {

            const keyValyArray = val.split("=")
            cookieJson[keyValyArray[0]] = keyValyArray[1]

        });

        if (!cookieJson.hasOwnProperty("authToken")) {
            res.status(401).send({
                status: 401,
                error: "unauthorised attemp",
                message: "login required"
            })
        }

        const tokenVerification = await verifyJWT(cookieJson.authToken,algorithumForJWTConfig.user)

        if (!tokenVerification.isValid) {
            res.status(401).send({
                status: 401,
                error: "unauthorised attemp",
                message: "invalid token"
            })
        }

        next()
    } catch (error) {
        console.log("sjnkjsngkjs");
    }
}

export default userAuthValidMW