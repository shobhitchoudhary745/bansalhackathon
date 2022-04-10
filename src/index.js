require('dotenv').config()
const express = require("express");   
require("./db/mongoose");
const app = express();
const Student=require('./models/student')
const cors=require('cors')
app.use(cors())
const port = process.env.PORT;
app.use(express.json());

app.post('/student',async(req,res)=>{
    const student=new Student(req.body)
    try{
        await student.save();
        res.status(201).send(student);
    }
    catch(e){
        res.status(400).send(e);
    }
})

app.post('/login',async(req,res)=>{
    if(req.body.password==="admin@1234"&&req.body.email==="admin@gmail.com")
      {
         const students = await Student.find()
         res.status(200).send(students)
      }
    else{
         res.status(401).send()
    }
})


app.listen(port,()=>{
    console.log('server is upon port '+port)
 })
