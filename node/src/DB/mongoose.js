import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config()

const db_port = process.env.db_port;
const db_user = process.env.db_user;
const db_password = process.env.db_password;
const db_domainname = process.env.db_domainname;
const db_name = process.env.db_name;

//connection creation and creating a new database
mongoose.connect(`${db_port}://${db_user}:${db_password}@${db_domainname}/${db_name}`).then(() => {
    console.log("database successfully connected...");

}).catch((error) => {
    console.log("ERROR : ", error);
})