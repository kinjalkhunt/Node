import mongoose from 'mongoose'

let userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            default: 'abc'
       
        },
        password:String,
        cpassword:String,

        email: {
            type: String
        }
    }
);
// this is a creaating a model
const userModel = mongoose.model("users", userSchema);//Users is a collection of db

export default userModel;
