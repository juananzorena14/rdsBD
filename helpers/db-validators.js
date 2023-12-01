const Usuario = require ("../models/usuario");
const Categoria = require ("../models/categoria");

//VALIDAR EMAIL
const emailExiste = async (email) => { 
    const existeEmail = await Usuario.findOne ({email})
    if (existeEmail) {
        throw new Error ("Ese correo ya está registrado")}};

//VALIDAR ID
const existeUsuarioPorId = async (id) => { 
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario) {
        throw new Error ("El ID no existe")};

    //VALIDAR USUARIO ELIMINADO
    if (!existeUsuario.state) {
        throw new Error ("El usuario ya está dado de baja")};
    };
      
//VALIDAR CATEGORIA NUEVA EN POST
const categoriaExiste = async (name) => { 
    const existeCategoria = await Categoria.findOne ({name})
    if (existeCategoria) {
        throw new Error ("Esa categoria ya existe")}};   
        
//VALIDAR SI EXISTE LA CATEGORIA BUSCADA
const categoriaNoExiste = async (name) => { 
    const noExisteCategoria = await Categoria.findOne ({name})
    if (!noExisteCategoria) {
        throw new Error ("Esa categoria no existe")}};   
        
//VALIDACIONES DE PUT Y DELETE PARA LA PAGINA ADMIN
const existeCategoriaPorId = async (id) => { 
    const existeCategoriaId = await Categoria.findById(id)
    if (!existeCategoriaId) {
        throw new Error ("El ID no existe")};

    //VALIDAR USUARIO ELIMINADO
    if (!existeCategoriaId.state) {
        throw new Error ("La categoria ya está dada de baja")};
    };        
        
module.exports = {
    emailExiste,
    existeUsuarioPorId,
    categoriaExiste,
    categoriaNoExiste,
    existeCategoriaPorId
}        


 