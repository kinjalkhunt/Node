import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const groupSchema = new mongoose.Schema({
    groupID: {
        type: String,
        required: true,
        // unique: true,
        default: uuidv4
    },
    groupName: {
        type: String,
        required: true
    },
    members: {
        type: [String],
        required: true
    }
});

const groupModel = mongoose.model("groups", groupSchema);

export default groupModel;
