const Usuario = require ("../models/usuario");
const bcrypt = require ("bcryptjs");
const {validationResult} = require ("express-validator");

//ACCESO A LOS MÉTODOS
const {request, response} = require ("express");

const usuariosGet = (req = request, res) => {
    //CONSULTA DE LIMIT Y PAGE
    const {limit, page} = req.query

    res.json({
        message: "GET usuarios - Controllers",
        limit,
        page, 
    }); 
};
const usuarioPost = async (req, res) => {
    const {name, email, password, address} = req.body;

    //CREAR UN USUARIO Y GUARDARLO
    const usuario = new Usuario ({name, email, password, address});

    //VALIDAR EMAIL
    const existeEmail = await Usuario.findOne ({email})
    if (existeEmail) {
        console.log (error);
        return res.status(400).json({
            msg: "El correo ya existe, elige otro",
        })};

    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync (password, salt);

    await usuario.save();

    res.status(201).json({
        message: "Usuario creado",
        usuario
    });
};
const usuarioPut = (req, res) => {
    const {id} = req.params;

    res.json({
        message: "PUT usuario - Controllers",
        id,
    });
};
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