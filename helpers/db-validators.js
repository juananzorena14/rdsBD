const Usuario = require ("../models/usuario");
const Categoria = require ("../models/categoria");
const Producto = require("../models/producto");

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
      
//CATEGORIA/POST : VALIDAR SI YA EXISTE LA CATEGORIA
const categoriaExiste = async (name) => { 
    const existeCategoria = await Categoria.findOne ({name})
    if (existeCategoria) {
        throw new Error ("Esa categoria ya existe")}};   
        
//CATEGORIA/GET : VALIDAR SI NO EXISTE LA CATEGORIA 
const categoriaNoExiste = async (name) => { 
    const noExisteCategoria = await Categoria.findOne ({name})
    if (!noExisteCategoria) {
        throw new Error ("Esa categoria no existe")}};   
        
//CATEGORIA/PUT Y DELETE : PAGINA ADMIN USANDO ID
const existeCategoriaPorId = async (id) => { 
    const existeCategoriaId = await Categoria.findById(id)
    if (!existeCategoriaId) {
        throw new Error ("El ID no existe")};

//CATEGORIA/DELETE : VALIDAR CATEGORIA ELIMINADA
    if (!existeCategoriaId.state) {
        throw new Error ("La categoria ya está dada de baja")};
    };        

//PRODUCTO/GET :  VALIDAR SI NO EXISTE PRODUCTO BUSCADO
const productoNoExiste = async (name) => { 
    const ExisteProducto = await Producto.findOne ({name})
    if (!ExisteProducto) {
        throw new Error ("Ese producto no existe")}};  

//PRODUCTO/POST : VALIDAR SI EL PRODUCTO YA EXISTE
const productoExiste = async (name) => { 
    const noExisteProducto = await Producto.findOne ({name})
    if (noExisteProducto) {
        throw new Error ("Ese producto ya existe")}}; 
        
//PRODUCTO/PUT Y DELETE : PAGINA ADMIN USANDO ID
const existeProductoPorId = async (id) => { 
    const existeProductoId = await Producto.findById(id)
    if (!existeProductoId) {
        throw new Error ("El ID no existe")};

//PRODUCTO/DELETE : VALIDAR CATEGORIA ELIMINADA
    if (!existeProductoId.state) {
        throw new Error ("El producto ya está dado de baja")};
    };        

        
module.exports = {
    emailExiste,
    existeUsuarioPorId,
    categoriaExiste,
    categoriaNoExiste,
    existeCategoriaPorId,
    productoExiste,
    productoNoExiste,
    existeProductoPorId
}        


 