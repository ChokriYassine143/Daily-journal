//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
var ObjectId = require('mongodb').ObjectId; 
const mongoose=require("mongoose");
const ejs = require("ejs");
const _=require("lodash");
const homeStartingContent ="Discover Your Inner World with Daily Journal. Welcome to Daily Journal – Your Path to Self-Discovery! At Daily Journal, we believe in the power of introspection. Embrace stress relief, creativity, and personal growth with our easy-to-use platform. Why Choose Daily Journal? 1. Empower Your Mind: Reduce stress, boost creativity, and develop emotional intelligence. 2. Stay Organized: Effortlessly manage entries, set reminders, and stay on track. 3. Private and Secure: Your thoughts are safe with us. 4. Connect and Inspire: Join a supportive community of like-minded individuals. Features We Offer: - Customizable Entries: Write, record, attach photos – your way. - Prompt Library: Spark creativity with thought-provoking prompts. - Progress Tracking: See your growth over time. - Gratitude Journaling: Cultivate a positive mindset. Join Today for a Free Trial! Start your journey to self-discovery. Sign up now for free. Happy journaling!"
const aboutContent = "Daily Journal: Empowering self-discovery and growth. Join our safe, inspiring space to express, reflect, and connect. Your journey to inner clarity starts here. Sign up for a free trial today. Happy journaling!"
const contactContent = `Connect with me: <a href="https://www.linkedin.com/in/yassine-chokri-a9a94925b/">LinkedIn</a> <a href="https://www.facebook.com/chokri.yassin.98">Facebook</a>`;

const url = "mongodb://127.0.0.1:27017/blogpost";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const postsh= new mongoose.Schema({
title:String,
body:String
});
const Post=mongoose.model("Post",postsh);

app.get("/",async (req,res)=>{
 let x= await Post.find();
 console.log(x);
  res.render("home",{homeStartingContent:homeStartingContent,postes:x});
});

app.get("/contact",(req,res)=>{

  res.render("contact",{cont:contactContent}); 
});
app.get("/posts/:ss",async(req,res)=>{
let x=req.params.ss;
id= new ObjectId(x);
let r= await Post.findOne({_id:id});
res.render("post",r);
 
});
app.get("/about",(req,res)=>{

  res.render("about",{about:aboutContent}); 
});
app.get("/compose",(req,res)=>{
res.render("compose");

});
app.post("/compose",(req,res)=>{

poste={
  title:req.body.title,
  body:req.body.body,
} 
Post.create(poste);


res.redirect("/");
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
