const express=require("express")
const app=express();
const port=8000;

const path=require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
 

app.use(express.urlencoded({extended: true }));
app.use(express.json());

let posts = [
    {
        id: "111",
        username:"rahul",
        content: "hello how are you"
    },
    {
        id: "102",
        username:"rohit",
        content: "xyz"
    }
]


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.get("/posts",(req,res)=>{
    res.render("home.ejs",{posts})
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/posts",(req,res)=>{
    const {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content})
    res.redirect("/posts")
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    // console.log(id)
    const post=posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    const post=posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
    const {id}=req.params;
    const newContent=req.body.content;
    // console.log(newContent);
    const post=posts.find((p) => id === p.id);
    // console.log(post);
    post.content=newContent;
    // console.log(post);
    res.redirect("/posts")

})

app.delete("/posts/:id",(req,res)=>{
    const {id}=req.params;
    posts=posts.filter((p) => id !== p.id);
    res.redirect("/posts")
})

app.listen(port,()=>{
    console.log("port running at 8000")
})