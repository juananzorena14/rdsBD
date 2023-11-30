const Usuario = require ("../models/usuario");
const bcrypt = require ("bcryptjs");

//ACCESO A LOS MÉTODOS
const {request, response} = require ("express");

//GET
const usuariosGet = (req = request, res) => {
    //CONSULTA DE LIMIT Y PAGE
    const {limit, page} = req.query

    res.json({
        message: "GET usuarios - Controllers",
        limit,
        page, 
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
        usuario
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
const usuarioDelete = (req, res) => {
    res.json({
        message: "DELETE usuario - Controllers",
    });
};

module.exports = {
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
};