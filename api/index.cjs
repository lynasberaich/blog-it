const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const app = express();

app.use(cors({credentials: true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

const salt = bcrypt.genSaltSync(10);
const secret = "ddb3rgb1ifb2q";

mongoose.connect('mongodb+srv://blog:zpE0x15TAvYkgRUz@cluster0.lvwxc.mongodb.net/');




app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    try {
        const UserDoc = await User.create({
            username, 
            password:bcrypt.hashSync(password, salt),
        });
        res.json(UserDoc);
    } catch(e) {
        res.status(400).json(e)
    }
    

});

app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        // we log in
        jwt.sign({username, id:userDoc._id}, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json('ok');
        });
    } else {
        res.status(400).json('wrong credentials');
    }

});

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info); 
    });
});

app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
});



app.listen(4000);


//zpE0x15TAvYkgRUz
//mongodb+srv://blog:zpE0x15TAvYkgRUz@cluster0.lvwxc.mongodb.net/