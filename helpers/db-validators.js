const Usuario = require ("../models/usuario");
 
//VALIDAR EMAIL
const emailExiste = async (email) => { 
    const existeEmail = await Usuario.findOne ({email})
    if (existeEmail) {
        throw new Error ("Ese correo ya está registrado")}};

//VALIDAR ID
const existeUsuarioPorId = async (id) => { 
    const existeUsuario = await Usuario.findById ({id})
    if (!existeUsuario) {
        throw new Error ("El ID no existe")}};
        

module.exports = {
    emailExiste,
    existeUsuarioPorId
}        
 