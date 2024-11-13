const { where } = require('sequelize');
const Student = require('../models/estudiantes.js');
const Usuario = require('../models/usuarios.js')

const getLog = async function(req,res){
    try{
        res.render('login');
    }catch(error){
        console.error(error);
        res.status(500).send('error en el servidor');
    }
}

const getRegistro = async function (req, res){
    try{
        res.render('registro');
    }catch(error){
        console.error(error);
        res.status(500).send('error en el servidor');
    }
}

const getData = async function (req,res){
    try{
        //                  Student
        const Datos = await Usuario.findAll();

        if(Datos){
            res.render('index',{Datos})
        }else{
            console.log(Datos)
            res.send('error')
        }
    }catch(error){
        console.error(error);
        res.status(500).send('error en el servidor');
    }
}

const getEditStudent = async function (req, res) {
    try{

        const Eid = req.params.id;
        const estudiante = await Student.findOne({where:{id:Eid}});

        res.render('editU',estudiante);

    }catch(error){
        console.error(error);
        res.status(500).send('error en el servidor');
    }
    
}

const getCreateStudent = async function (req,res) {
    try{
        res.render('createStudent');

    }catch(error){
        console.error(error);
        res.status(500).send('error en el servidor');
    }
    
}
//--------------------------------- post related functions --------------------------------------//

const logIn = async function (req, res){
    try{
        const { email, contrasena } = req.body
    
        const user = await Usuario.findOne({where:{correo:email, contrasena:contrasena}})

        if (user){

            res.redirect('/index')
            console.log(user.id);
            console.log(user.nombre);
            console.log(user.correo);
        }else{
            res.redirect('/registro');
        }

    }catch(error){
        console.error(error);
        res.status(500).send('error en el servidor');
    }
}

const registro = async function (req, res) {

    try{
        const { email, tel, nombre , contrasena } = req.body
    
        await Usuario.create({nombre, tel, correo: email, contrasena })
        res.redirect('/index');
    }catch(error){
        console.error(error);
        res.status(500).send('error en el servidor');
    }
    
}

const postEditStudent = async function(req,res){
    try{
        const studentId = req.params.id;
        const {nombre, email, tel, contrasena} = req.body;

        const newData = { nombre, correo : email, tel, contrasena }

        await Student.update(newData, {where:{id:studentId}});

    }catch(error){
        console.error(error);
        res.status(500).send('error en el servidor');
    }
    
}

const postCreateStudent = async function (req,res) {

    try{
        const { nombre, email, tel, carrera_Id} = req.body;

        await Student.create({nombre, tel, correo: email,carrera_Id, status_Id });

        res.redirect('/index')

    }catch(error){
        console.error(error);
        res.status(500).send('error en el servidor');
    }
    
}

const disableStudent = async function (req,res) {
    try{
        const studentID = req.params.id;
        const newStatus = {status_Id: 0};
        await Student.update(newStatus, {where:{id:studentID}});

    }catch(error){
        console.error(error);
        res.status(500).send('error en el servidor');
    }
    
}

module.exports = { getData,getLog,getRegistro,logIn ,registro}