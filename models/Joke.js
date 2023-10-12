const {Schema, model} = require("mongoose")

const jokeSchema = new Schema({
    categories:{
        type:Array,
    },
    created_at:{
        type: Date,
        trim:true
    },
    icon_url:{
        type:String,
        trim:true
    },
    updated_at:{
        type: Date,
    },
    url:{
        type: String,
        trim: true
    },
    value:{
        type: String,
        trim: true
    },
})

const Joke = model("joke", jokeSchema)

module.exports = Joke