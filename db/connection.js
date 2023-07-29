const mongoose=require('mongoose');
const url = 'mongodb+srv://HarshaVilasraoNikhade:Harsha1234@cluster0.znhrbrv.mongodb.net/';
const dotenv = require('dotenv')
dotenv.config()
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("Connected to MongoDB Atlas");
})
.catch((error)=>{
    console.error("MongoDB Atlas connection error:',error");
});