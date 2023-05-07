const dotenv =require('dotenv');
const express =require('express');
const bcryptjs =require('bcryptjs');
const jwt =require('jsonwebtoken');
const multer = require('multer');
const cors = require('cors');
const cookieParser =require('cookie-parser');

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage });

dotenv.config({path:'./config.env'});
require('/Users/Kartheek/Desktop/MERN Stack/nothing/mpb/server/db/conn');

const port=process.env.PORT;
//require model
const Users=require('./models/userSchema');
const Message=require('./models/msgSchema');
const File = require('./models/fileSchema');
const Loan=require('./models/loanSchema');
const Fifteen=require('./models/fifteenSchema');
const Thirty=require('./models/thirtySchema');
const Sell=require('./models/sellSchema');
const Details = require('./models/detailsSchema');
const Pawnbroker = require("./models/pawnbrokerSchema");
const authenticate=require('./middleware/authenticate');

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("HEllo world");
})

//registration
app.post('/register',async (req,res)=>{
    try{
        //get body or data
        const username=req.body.username;
        const email=req.body.email;
        const password=req.body.password;

        const createUser =new Users({
            username: username,
            email : email,
            password : password
        });
         //sve method is used to create user or insert user
         //but before saving or inserting , password will hash
         //because of hashing . after hash,it will save to db
        const created =await createUser.save();
        console.log(created);
        res.status(200).send("registered");
    }catch(error){
       res.status(400).send(error)
    }
})

//login user
app.post('/login',async(req,res)=>{
    try{
        const email=req.body.email;
        const password =req.body.password;

        //find user if exists
        const user=await Users.findOne({email: email});
        if(user){
            const isMatch= await bcryptjs.compare(password,user.password);
            if(isMatch)
            {
                const token=await user.generateToken();
                res.cookie("jwt",token,{
                    expire : new Date(Date.now() + 86400000),
                    httpOnly:true
                })
                res.status(200).send("LoggedIn")
            }else{
                res.status(400).send("INvalid Credentials");
            }
    
        }else{
            res.status(400).send("INvalid Credentials");
        }

    }catch(error){
       res.status(400).send(error);
    }
})


//message
app.post('/message',async (req,res)=>{
    try{
        //get body or data
        const name=req.body.name;
        const email=req.body.email;
        const message=req.body.message;
 
        const createMsg =new Message({
            name: name,
            email : email,
            message : message
        });
         //sve method is used to create user or insert user
         //but before saving or inserting , password will hash
         //because of hashing . after hash,it will save to db
        const created =await createMsg.save();
        console.log(created);
        res.status(200).send("message has been send");
    }catch(error){
       res.status(400).send(error)
    }
})
app.get('/fecth',async (req,res)=>{
    Users.find({},(err,result)=>{
     if(err){
         res.send(err);
     }
     res.json(result);
    })
 })
app.get('/logout',(req,res)=>{
    res.clearCookie("jwt",{path : '/'})
    res.status(200).send("User logged out")
})

//authentication
//app.get('/auth', authenticate,(req,res)=>{

//})

app.post('/submit',async (req,res)=>{
    try{
        //get body or data
        const name=req.body.name;
        const email=req.body.email;
 
        const createLoan =new Loan({
            name: name,
            email : email
        });
         //sve method is used to create user or insert user
         //but before saving or inserting , password will hash
         //because of hashing . after hash,it will save to db
        const created =await createLoan.save();
        console.log(Sent);
        res.status(200).send("Details have been submitted");
    }catch(error){
       res.status(400).send(error)
    }
})

app.post('/api/pawnbrokers', async (req, res) => {
    const { fullname, dob, phnumber, city, email } = req.body;
    const pawnbroker = new Pawnbroker({ fullname, dob, phnumber, city, email });
    try {
      const savedPawnbroker = await pawnbroker.save();
      res.status(201).json(savedPawnbroker);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error adding pawnbroker');
    }
  });

  app.get('/api/pawnbrokers', async (req, res) => {
    const { name, city } = req.query;
    try {
      let pawnbrokers;
      if (name && city) {
        pawnbrokers = await Pawnbroker.find({ name, city });
      } else if (name) {
        pawnbrokers = await Pawnbroker.find({ name });
      } else if (city) {
        pawnbrokers = await Pawnbroker.find({ city });
      } else {
        pawnbrokers = await Pawnbroker.find();
      }
      res.json(pawnbrokers);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error searching for pawnbrokers');
    }
  });


  app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
      const file = new File({
        name: req.file.originalname,
        data: req.file.buffer,
      });
      await file.save();
      res.status(201).send({ message: 'File uploaded successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Server error' });
    }
  });

  app.post('/api/details', async (req, res) => {
    const { title, fname, lname, dob, mstatus, email, phnumber, aadhar, occupation, yoe, gmi, bname, street, city, sname, zip } = req.body;
    const details = new Details({ title, fname, lname, dob, mstatus, email, phnumber, aadhar, occupation, yoe, gmi, bname, street, city, sname, zip });
    try {
      const savedDetails = await details.save();
      res.status(201).json(savedDetails);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error Saving Details');
    }
  });

  app.post('/api/sell', async (req, res) => {
    const { name, comment, dop, est, fault } = req.body;
    const sellitem = new Sell({ name, comment, dop, est, fault });
    try {
      const saveditem = await sellitem.save();
      res.status(201).json(saveditem);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error adding item for sale!!!');
    }
  });

  app.get('/api/buy', async (req, res) => {
    try {
      const items = await Sell.find();
      res.status(200).json(items);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching items for sale!');
    }
  });

  app.post('/api/fifteen', async (req, res) => {
    const { date, intrest, annual } = req.body;
    const fifteen = new Fifteen({date, intrest, annual });
    try {
      const savedRate = await fifteen.save();fifteen
      res.status(201).json(savedRate);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error changing the rate!!!');
    }
  });

  app.post('/api/thirty', async (req, res) => {
    const { date, intrest, annual } = req.body;
    const thirty = new Thirty({date, intrest, annual });
    try {
      const savedRate = await thirty.save();
      res.status(201).json(savedRate);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error changing the rate!!!');
    }
  });

  app.get('/api/sell', async (req, res) => {
    try{
      const item = await Sell.find();
      res.json(item);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error searching for pawnbrokers');
    }
  });

  app.get('/fifteen-rates', async (req, res) => {
    try {
      const rates = await Fifteen.find().sort({ date: -1 }).limit(1).exec();
  
      if (rates.length === 0) {
        return res.status(404).json({ message: 'No rates found' });
      }
  
      res.json(rates[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // app.post('/api/fivebyone', async (req, res) => {
  //   const { date, intrest, annual } = req.body;
  //   const fivebyone= new Fivebyone({date, intrest, annual });
  //   try {
  //     const savedRate = await fivebyone.save();
  //     res.status(201).json(saveditem);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Error changing the rate!!!');
  //   }
  // });

app.listen(port,()=>{
    console.log("server is listening")
})

