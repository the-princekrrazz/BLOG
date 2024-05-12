const express = require("express");
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const UserRoute = require("./routes/user")
const cookieParser = require("cookie-parser");
const blogRoute = require("./routes/blog");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const Blog = require("./models/blog");


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));



mongoose.connect("mongodb://localhost:27017/BLOG")
.then((e)=>{console.log("CONNECTED WITH DATABASE")});



app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.resolve('./public')));
app.use(checkForAuthenticationCookie('token'));

app.get("/",async(req,res)=>{
    const allBlogs = await Blog.find({});
    return res.render('home',{
       user:req.user, 
       blogs:allBlogs
    });
})
app.use("/user",UserRoute);
app.use("/blog",blogRoute);
app.get("")

app.listen(3000,()=>{console.log("I am listening on port: 3000")});