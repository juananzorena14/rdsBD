const Usuario = require ("../models/usuario");
 
//VALIDAR EMAIL
const emailExiste = async (email) => { 
    const existeEmail = await Usuario.findOne ({email})
    if (existeEmail) {
        throw new Error ("Ese correo ya está registrado")}};

//VALIDAR ID
const existeUsuarioPorId = async (id) => { 
    const existeUsuario = await Usuario.findById (id)
    if (!existeUsuario) {
        throw new Error ("El ID no existe")}};

//VALIDAR USUARIO ELIMINADO
const existeUsuarioPorState = async (state) => { 
    const usuarioEliminado = await Usuario.findOne ({state})
    if (!usuarioEliminado) {
        throw new Error ("El usuario ya está dado de baja")}};        
        

module.exports = {
    emailExiste,
    existeUsuarioPorId,
    existeUsuarioPorState
}        


 