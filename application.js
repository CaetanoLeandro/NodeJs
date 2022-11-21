const express = require('express');
const app = express()

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { eAdmin } = require('./middlewares/auth');

app.use(express.json());

app.get('/', eAdmin, async(req, res) => {
    return res.json({
        error: false,
        message: "List users",
        id_logged_user: req.userId
    });
});

app.post('/register', async(req, res) => {
    //$2a$08$/pPNmc5Dcp631ufA/MGVSenhGzsrWw7AOZ75TpaoFmqvW2G3BgB.S
    const  password = await bcrypt.hash("123456", 8);

    console.log(password);

    return res.json({
        error: false,
        message: "Register user"
    });
})

app.post('/login', async(req, res) => {
    console.log(req.body);

    if(req.body.email != "lcaetano30@gmail.com"){
        return res.status(400).json({
            error: true,
            message: "Error: Login error, try again!"
        });
    }

    if(!(await bcrypt.compare(req.body.password, 
        "$2a$08$/pPNmc5Dcp631ufA/MGVSenhGzsrWw7AOZ75TpaoFmqvW2G3BgB.S"))){
            return res.status(400).json({
                error: true,
                message: "Error: Login error, try again!"
            });
        }

        var token =jwt.sign({id: 1}, "LO#RE5FD#@$@%$OJUJU%$@", {
            expiresIn: '7d'
        })

    return res.json({
        error: false,
        message: "Successful login!",
        token
    });
})

app.listen(8080, () => {
    console.log("Server started on port 8080: http://locsahost:8080")
});