const express=require("express")
const app=express()
const dotenv=require("dotenv").config()
const connectDb=require("./config/connectionDb")
const cors=require("cors")

const PORT=process.env.PORT || 3000
connectDb()

app.use(express.json())
app.use(cors())
app.use(express.static("public"))

app.use("/",require("./routes/user"))
app.use("/recipe",require("./routes/recipe"))

app.get("/home", (req, res) => {
  res.send("<h2>✅ Server is running successfully!</h2>");
});

app.listen(PORT,(err)=>{
    console.log(`app is listening on port ${PORT}`)
})