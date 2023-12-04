const {response, request} = require ("express");
const bcryptjs = require ("bcryptjs");
const Usuario = require ("../models/usuario");
const {generarJWT} = require ("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
    const {email, password} = req.body;

    try {
        //VERIFICAR SI EL EMAIL EXISTE EN LA BD
        const usuario = await Usuario.findOne ({email})
        if (!usuario){
        return res.status(400).json({
            msg: "Correo incorrecto"})};

        //VERIFICAR SI STATE:TRUE
        if (!usuario.state){
            return res.status(400).json({
                msg: "Usuario suspendido"})};

        //VERIFICAR SI LA PASSWORD ES LA CORRECTA
        const validarPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validarPassword){
            return res.status(400).json({
                msg: "Contraseña incorrecta"})};

        //GENERAR TOKEN
        const token = await generarJWT(usuario.id);
        
        res.status(200).json({
            usuario,
            token
            });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Comuníquese con el administrador"
        });
    };
};

const obtenerID = (req, res) => {
    const {id, role} = req.usuario;

    res.json({
        id,
        role
    });
};

module.exports = {
    login,
    obtenerID,
}