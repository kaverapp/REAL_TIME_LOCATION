const express=require("express");
const path=require("path");
const socketio=require("socket.io");
const http=require("http");
const { log } = require("console");

const app=express();

const server=http.createServer(app);

const io=socketio(server);

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));


app.get("/",(req,res)=>{
    res.render("unknown");
});

io.on("connection",function(socket){
    socket.on("send-location",(data)=>{
       io.emit("recieve-location",{id:socket.id,...data});
       console.log("connected",socket.id);
    });
    console.log("connected");
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id)
    })
})


server.listen(3000,()=>{
    console.log("server is listening on port 3000");
    
});