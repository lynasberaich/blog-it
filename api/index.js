import require;

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

await mongoose.connect('mongodb+srv://blog:zpE0x15TAvYkgRUz@cluster0.lvwxc.mongodb.net/');




app.post('/register', (req,res) => {
    const {username,password} = req.body;
    res.json({requestData:{username,password}});

});

app.listen(4000);


//zpE0x15TAvYkgRUz
//mongodb+srv://blog:zpE0x15TAvYkgRUz@cluster0.lvwxc.mongodb.net/