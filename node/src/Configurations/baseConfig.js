//saved the minor secure propurty in config
const saltRoundConfigVar = 10

const algorithumForJWTConfig = {
    seller:"HS256",
    user:"HS512",
    admin:"HS384"
}
export{saltRoundConfigVar,algorithumForJWTConfig}