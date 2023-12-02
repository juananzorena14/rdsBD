const {request, response} = require ("express");
const Categoria = require ("../models/categoria");
const Producto = require ("../models/producto");

const coleccionesPermitidas = ["categorias", "productos"];

//FUNCIÓN PARA BUSCAR CATEGORIA POR NOMBRE
const buscarCategoria = async (termino, res) => {
    const regex = new RegExp (termino, "i");

    const categorias = await Categoria.find ({
        name: regex,
        state: true,
    }).populate("usuario", "name");

    res.json({
        results: categorias
    });
};

//FUNCIÓN PARA BUSCAR PRODUCTO POR NOMBRE
const buscarProducto = async (termino, res = response) => {
    const regex = new RegExp (termino, "i");

    const productos = await Producto.find ({
        name: regex,
        state: true,
    }).populate("usuario", "name").populate("categoria","name");

    res.json({
        results: productos
    });
};

//FUNCIÓN DE BÚSQUEDA FLEXIBLE
const buscar = async (req, res) => {
    const {coleccion, termino} = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    };

    switch (coleccion) {
        case "categorias":
            buscarCategoria (termino, res)
            break;
        case "productos":
            buscarProducto (termino, res)
            break;
        default:
            res.status(500).json({
                msg: "No hubo respuesta del servidor"
            })
            break;
    }
};

module.exports = {
    buscar
};
