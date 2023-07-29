const mongoose = require('mongoose')

const signupschema = new mongoose.Schema(
    {
        fullname: String,
        username: String,
        password: String,
    }
)

const signupModel = mongoose.model(
    "signups", signupschema
)

module.exports = {signupModel}