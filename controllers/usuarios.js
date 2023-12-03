const Usuario = require ("../models/usuario");
const bcrypt = require ("bcryptjs");

//ACCESO A LOS MÉTODOS
const {request, response} = require ("express");

//GET
const usuariosGet = async (req, res) => {
    //CONSULTA DE LIMIT Y PAGE
    const {limite=5, desde=0} = req.query;

    //CUANDO HAY VARIAS CONSULTAS
    const [total, usuarios]=await Promise.all([
        Usuario.countDocuments({state : true}),
        Usuario.find({state : true}).limit(limite).skip(desde)]);

    res.status(200).json({
        total,
        usuarios,
    })};

//POST
const usuarioPost = async (req, res) => {
    const {name, email, password, address} = req.body;

    //CREAR UN USUARIO Y GUARDARLO
    const usuario = new Usuario ({name, email, password, address});

    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync (password, salt);

    await usuario.save();

    res.status(201).json({
        message: "Usuario creado",
        usuario,
    })};

//PUT
const usuarioPut = async (req, res) => {
    const {id} = req.params;

    const {password, __id, email, ...resto} = req.body;
    
    const salt = bcrypt.genSaltSync(10);
    resto.password = bcrypt.hashSync (password, salt);

     const usuario = await Usuario.findByIdAndUpdate (id, resto, {new:true});

    res.status(200).json({
        message: "Usuario actualizado",
        usuario,
    })};

//DELETE    
const usuarioDelete = async (req, res) => {
    const {id} = req.params;

    //INACTIVAR
    const usuarioBorrado = await Usuario.findByIdAndUpdate(id,{state : false},{new : true});

    res.status(200).json({
        message: "Usuario eliminado",
        usuarioBorrado
    });
};

module.exports = {
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
};