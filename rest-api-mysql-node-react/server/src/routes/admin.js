const express = require('express');
const router = express.Router()

const mysqlConnection = require('../database');

router.get('/',(req, res)=>{
    mysqlConnection.query('SELECT * FROM users', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/:id',(req,res)=>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM users WHERE iduser = ?',[id],
    (err,rows, fields) => {
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

router.post('/loginUser',(req,res) =>{
    const{correo, password} = req.body;
    console.log(correo , password);
    const query ='SELECT * FROM users where correo = ? AND password = ?;';
    mysqlConnection.query(query,[correo, password],
    (err, result)=>{
        if(err){
            res.send({'err ':err});
        }
        if(result.length != 0 ){
            res.send(result);   
        }else{
            res.send({message:'Username or password are invalid'});
        }
    });
});


router.post('/addUser', (req, res) =>{
    const{correo , password} = req.body;
    rol = 'user';
    const queryTest = 'SELECT * FROM users where correo = ?';
    const query = 'INSERT INTO users(correo,password,rol) values( ? , ? , ? )';
    mysqlConnection.query(queryTest,[correo],
    (err, rows, fields)=>{
        if(!err){
            if(rows.length > 0){
                mysqlConnection.query(query,[correo,password,rol],(err,rows,fields) =>{
                    res.json({Status:'User saved'});
                });
            }else{
                res.json({Status:'User already register'});
            }
            
        }else{
            console.log(err);
        }
    });
});

router.post('/addContent', (req, res) =>{
    const{url , name , description} = req.body;
    const query = 'content(url,name_content,description) values( ? , ? , ? )'
    mysqlConnection.query(query,[url , name , description],
    (err, rows, fields)=>{
        if(!err){
            res.json({Status:'Content saved'});
        }else{
            console.log(err);
        }
    });
});

router.put('/updateUser',(req,res)=>{
    const{correo , password} = req.body;
    const query = 'UPDATE users SET  password = ? WHERE correo = ?';
    mysqlConnection.query(query,[correo , password], (err,rows,fields)=>{
        if(!err){
            res.json({Status:'Password to user '+correo+' has been update'});
        }else{
            console.log(err);
        }
    });
});

router.delete('/deleteUser',(req,res)=>{
    const { correo } = req.body;
    mysqlConnection.query('DELETE from users WHERE correo = ?',[correo],
    (err,rows,fields) => {
        if(!err){
            res.json({Status:'Password to user '+correo+' has been update'});
        }else{
            console.log(err);
        }
    });
});

module.exports = router;