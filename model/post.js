const mongoose = require('mongoose')

const postSchema =new mongoose.Schema(
    
// {
//     userId: String,
//     posts: String,
//     createdAt: {type: Date, default: Date.now}
// }

{
    userId: String,
    posts: String,
    createdAt: {type: Date, default: Date.now}
}
    
)

const postModel = mongoose.model(
    "posts", postSchema
)

module.exports = {postModel}


