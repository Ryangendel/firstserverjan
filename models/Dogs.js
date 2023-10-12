const {Schema, model} = require("mongoose")

const dogSchema = new Schema({
    name:{
        type:String,
        trim:true
    },
    age:{
        type:Number,
        trim:true
    },
    breed:{
        type:String,
        trim:true
    },
    pound:{
        type:String,
        trim:true
    },
})

const Dog = model("dog", dogSchema)

module.exports = Dog