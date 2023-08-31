const express = require('express');
const bodyParser =require('body-parser');
const { error } = require('console');
const bcrypt = require('bcrypt')
const cors = require('cors')
const app = express();


app.use(bodyParser.json())
app.use(cors())

const saltRounds = 10;
const database = {
    users:[
        {
            id:"123",
            name:"yara",
            email:"yara@gmail.com",
            password:"yara123",
            entries:0,
            joined: new Date()
        },
        {
            id:"456",
            name:"sara",
            email:"sara@gmail.com",
            password:"sara123",
            entries:0,
            joined: new Date()
        },
    ],
   login:[
    {
        id:'987',
        hash:'',
        email:'yara@gmail.com'
    }
   ] 
}


app.get('/',(req,res)=>{
    res.send(database.users)
})

app.post('/signin',(req,res)=>{
    // Load hash from your password DB.
bcrypt.compare('wall123', '$2b$10$nAT6yBmCrMBxIU8cgyAMhO0BZUrGJGEiwEP3RTMGOdKwc3hkLkOwe', function(err, result) {
    // result == true
    console.log('first guess',result)
});
bcrypt.compare('888wall','$2b$10$nAT6yBmCrMBxIU8cgyAMhO0BZUrGJGEiwEP3RTMGOdKwc3hkLkOwe', function(err, result) {
        // result == false
        console.log('second guess',result)

});
   if(req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password){
        res.json('success')
    }else{
        res.status(400).json('error logging in')
    }
   })




app.post('/register',(req,res)=>{
    const {email,name,password} = req.body;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash)
    });
    database.users.push({
        id:"888",
            name:name,
            email:email,
            entries:0,
            joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})


app.get('/profile/:id',(req,res)=>{
    const {id} = req.params;
    let found= false
    database.users.forEach(user =>{
        if(user.id === id){
            found = true
           return res.json(user)
        }
    })
    if(!found){
        res.status(404).json('user not found')
    }
})

app.put('/image',(req,res)=>{
    const {id} = req.body;
    let found= false
    database.users.forEach(user =>{
        if(user.id === id){
            found = true
            user.entries++
           return res.json(user.entries)
        }
    })
    if(!found){
        res.status(404).json('user not found')
    }
})

app.listen(3000,()=>{
    console.log("app is running on port 3000")
})
