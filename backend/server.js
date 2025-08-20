import express from "express"
import cors from "cors"
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import {DB} from './config/db.js'

const app = express();
const port = process.env.PORT || 3000;
console.log(port)
DB();

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials : true}))

app.get("/",(req,res)=>{
    res.send("Welcome to my page")
})

// Import Here All the Router
import router from "./router/auth.route.js"
import userRouter from "./router/user.route.js"


// All Localhost Link Here
app.use("/api/auth" , router)
app.use("/api/user" , userRouter)

app.listen(port , ()=>{
   console.log(`port number :  ${port}`)
})
