require('dotenv').config()
const express = require("express");   
require("./db/mongoose");
const app = express();
const Student=require('./models/student')
const Event =require('./models/events')
const cors=require('cors')
const {sendWelcomeEmail}=require('./emails/email')
app.use(cors())
const port = process.env.PORT;
app.use(express.json());

app.post('/student',async(req,res)=>{
    if(req.headers.secret_key!==process.env.SECRET_KEY){
        return res.status(401).send('you are try to access this route from outside the browser!');
    }
    const student=new Student(req.body)
    try{
        await student.save();
        const email=student.email
        const name=student.first_name+" "+student.last_name
        await sendWelcomeEmail(email,name)
        res.status(201).send(student);
    }
    catch(e){
        res.status(400).send(e);
    }
})

app.get('/student',async(req,res)=>{
    if(req.headers.secret_key!==process.env.SECRET_KEY){
        return res.status(401).send('you are try to access this route from outside the browser');
    }
    try{
        const students=await Student.find()
        res.status(200).send(students)
    }
    catch(e){
        req.status(401).send(e)
    }
})

app.post('/login',(req,res)=>{
    if(req.headers.secret_key!==process.env.SECRET_KEY){
        return res.status(401).send('you are try to access this route from outside the browser');
    }
    if(req.body.password==="admin@1234"&&req.body.email==="admin@gmail.com")
      {
         res.status(200).send({token:"bxhchxhxhfxfxhvhgjfytyry56558647545474"})
      }
    else{
         res.status(401).send()
    }
})

app.post('/event',async(req,res)=>{
    if(req.headers.secret_key!==process.env.SECRET_KEY){
        return res.status(401).send('you are try to access this route from outside the browser');
    }
    try{
         const event=new Event(req.body)
         await event.save()
         res.status(201).send(event)
    }
    catch(e){
         res.status(401).send(e)
    }
})

app.get('/event',async(req,res)=>{
    if(req.headers.secret_key!==process.env.SECRET_KEY){
        return res.status(401).send('you are try to access this route from outside the browser');
    }
    try{
        const events=await Event.find()
        res.status(200).send(events)
    }
    catch(e){
        res.status(401).send(e)
    }
})

app.delete('/event/:id',async(req,res)=>{
    if(req.headers.secret_key!==process.env.SECRET_KEY){
        return res.status(401).send('you are try to access this route from outside the browser');
    }
    try{
        console.log('hello world')
         const event=await Event.findByIdAndDelete(req.params.id)
         res.status(200).send(event)
    }
    catch(e){
         res.status.apply(401).send(e)
    }
})

app.patch('/event/:id',async(req,res)=>{
    if(req.headers.secret_key!==process.env.SECRET_KEY){
        return res.status(401).send('you are try to access this route from outside the browser');
    }
    try{
         console.log('first')
         const event=await Event.findById(req.params.id)
         if(req.body.event_name)
         event.event_name=req.body.event_name
         if(req.body.start_date)
         event.start_date=req.body.start_date
         if(req.body.end_date)
         event.end_date=req.body.end_date
         if(req.body.description)
         event.description=req.body.description
         if(req.body.event_type)
         event.event_type=req.body.event_type
         await event.save()
         res.status(200).send(event)
    }
    catch(e){
         res.status(401).send(e)
    }
})

app.listen(port,()=>{
    console.log('server is upon port '+port)
 })
