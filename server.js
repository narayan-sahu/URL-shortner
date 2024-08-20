import express from 'express'
import mongoose from 'mongoose'
import { urlShort, getOriginalUrl } from "./Controllers/url.js";
import {} from 'dotenv'
import cors from 'cors'

const app = express();
const port = 3001;

config({path:'.env'})

app.use(cors({
  origin:true,
  methods:["POST","GET","DELETE","PUT"],
  credentials:true
}))

app.use(express.urlencoded({extended:true}))

mongoose
  .connect(process.env.MongoUrl,
    {
      dbName: "NodeJS_Express_API_Connection",
    }
  )
  .then(() => console.log("Mongodb Connected"))
  .catch((error) => console.log(error));


  app.get('/',(req,res)=>{
    res.render("server.ejs",{shortUrl:null})
  })

  // handle url submission
  app.post("/shorten", urlShort);

  // redirect to original url using short url
  app.get("/:shortCode", getOriginalUrl);


app.listen(port,()=>console.log(`Server is running on port ${port}`))