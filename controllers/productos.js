const Producto = require ("../models/producto");

const productosGet = async (req, res) => {
    const {limite = 5, desde = 0} = req.query;
    const consulta = {state : true};

    const [total, productos] = await Promise.all ([
        Producto.countDocuments(consulta),
        Producto.find(consulta).skip(desde).limit(limite)
        .populate("usuario","name email")
        .populate("categoria","name")
    ]);
}
    res.status(200).json ({
        total,
        productos
    });

const productoGet = async (req, res) => {
    const {name} = req.params;
    const productoMostrar = await Categoria.findOne ({name})
    .populate("usuario","name email")
    .populate("categoria","name");
    
    res.status(200).json ({
        productoMostrar
    });
};

const productoPost = async (req, res) => {
    const {price, description, img} = req.body;
    const name = req.body.name.toUpperCase();

    const productoDB = await Producto.findOne({ name });
    
    //SI LA CATEGORIA EXISTE
    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.name} ya existe`,
        });
    }
    const data = {
        name,
        price,
        description,
        img,
        usuario: req.usuario._id
    };

    const producto = new Producto (data);
    await producto.save();
    res.status(201).json(producto);
};

const productoPut = async (req, res) => {
    const {id} = req.params;
    const usuario = req.usuario._id;

    const datos = {
        usuario
    };

    if (req.body.name) {
        datos.name = req.body.name.toUpperCase()
    };

    if (req.body.price) {
        datos.price = req.body.price
    };

    if (req.body.description) {
        datos.description = req.body.description
    };

    if (req.body.img) {
        datos.img = req.body.img
    };

    const productoActualizado = await Producto.findByIdAndUpdate (id, datos, {new : true});

    res.status(200).json({
        productoActualizado
    });
};

productoDelete = async (req, res) => {
    const {id} = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate (id, {state : false}, {new : true});

    res.status(200).json({
        msg: "Producto desactivado",
        productoBorrado
    });
};

module.exports = {
    productoGet,
    productosGet,
    productoPost,
    productoPut,
    productoDelete
};



