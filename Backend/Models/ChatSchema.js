const mongoose = require("mongoose")
const chatSchema = mongoose.Schema(
    {
        members: {
            type: Array
        },
    },
    {
        timestamps: true,
    }
)
const chatModel=mongoose.model("chat",chatSchema);
module.exports=chatModel;