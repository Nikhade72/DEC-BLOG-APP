const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const { signupModel } = require('./model/Signup');
const dotenv = require('dotenv');
const { postModel } = require('./model/post');
const jwt = require('jsonwebtoken')

dotenv.config()
const app = express()

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));

require('./db/connection')
// require('./model/signup')
// require('./model/post')


const path = require('path');
app.use(express.static(path.join(__dirname,'/build')));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname
    ,'/build/index.html')); });

//signup
app.post('/api/register', async (req, res) => {
    var data = new signupModel(req.body)
    data.save(
        res.json({ msg: 'success' })
    )
}
)

const item = { signupModel }

app.post('/api/login', async (req, res) => {
    let data = signupModel()
    let username = req.body.username
    let password = req.body.password
    let user = await signupModel.findOne({ username: username })
    console.log(user)
    if (!user) {
        res.json({ msg: "user not found" })
    }
    try {
        if (user.password == password) {
            console.log("going to generate token")
            console.log(user._id)

            jwt.sign({ email: username, id: user._id }, "harsha", { expiresIn: "1d" },
                (error, token) => {
                    console.log("token generating")
                    if (error) {
                        res.json({ msg: "token not generated" })
                    } else {
                        res.json({ msg: "login successful", token: token, data: user })

                    }
                }
            )
        }
        else {
            res.json({ msg: "Login failed" })
        }

    } catch (error) {

    }

}
)

app.post('/api/posts', (req, res) => {

    let data = new postModel(req.body)
    jwt.verify(req.body.token, "harsha",
        (error, decoded) => {
            if (decoded && decoded.email) {
                data.save()
                res.json({ msg: 'success' })


            } else {
                res.json({ status: "Unathorized User" })
            }
        })
})

app.post('/api/viewallposts', async(req, res) => {
    console.log(req.body.token)
    let data =  await postModel.find()

    jwt.verify(req.body.token, "harsha",
        (error, decoded) => {
            if (decoded && decoded.email) {
                res.json(data)
            } else {
                res.json({ status: 'Unathorized User' })

            }
        })

    })


    app.post('/api/viewmyposts', async (req, res) => {
        let data = await postModel.find(req.body)
        res.json(data)
    })


    app.post('/api/viewmyprofile', async (req, res) => {
        let data = await signupModel.find(req.body)
        res.json(data)
    })


    app.post('/api/deletepost', async (req, res) => {
        let data = await postModel.deleteOne(req.body)
        res.json({ status: "Deleted success" })
    })







    const port = 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });