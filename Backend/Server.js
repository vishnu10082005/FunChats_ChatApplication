const express=require("express")
const app = express()
const Port=3000;
const route=require("./Routes/Routes")
const cors=require("cors")
const databaseconnection=require("./DBConnection")
databaseconnection()

app.use(express.json())
app.use(cors())
app.use(route)
app.get("/",(req,res)=>{
    res.send("Api is working");
})
app.listen(Port,()=>{
    console.log(`http://localhost:${Port}`)
})
