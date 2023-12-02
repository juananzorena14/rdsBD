const Categoria = require ("../models/categoria");

const categoriasGet = async (req, res) => {
    const {limite = 5, desde = 0} = req.query;
    const consulta = {state : true};

    const [categorias, total] = await Promise.all ([
        Categoria.countDocuments(consulta),
        Categoria.find(consulta).skip(desde).limit(limite).populate("usuario","name email")
    ]);

    res.status(200).json ({
        total,
        categorias
    });
};

const categoriaGet = async (req, res) => {
    const {name} = req.params;
    const categoriaMostrar = await Categoria.findOne ({name});

    res.status(200).json ({
        categoriaMostrar
    });
};

const categoriaPost = async (req, res) => {
    const name = req.body.name.toUpperCase();
    const img = req.body.img;
    const categoriaDB = await Categoria.findOne({ name });
    
    //SI LA CATEGORIA EXISTE
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.name} ya existe`,
        });
    }
    const data = {
        name,
        img,
        usuario: req.usuario._id
    };

    const categoria = new Categoria (data);
    await categoria.save();
    res.status(200).json(categoria);
};

const categoriaPut = async (req, res) => {
    const {id} = req.params;
    const name = req.body.name.toUpperCase();
    const usuario = req.usuario._id;
    console.log(id);
    const datos = {
        name,
        usuario
    };

    const categoriaActualizada = await Categoria.findByIdAndUpdate (id, datos, {new : true});

    res.status(200).json({
        categoriaActualizada
    });
};

categoriaDelete = async (req, res) => {
    const {id} = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate (id, {state : false}, {new : true});

    res.status(200).json({
        msg: "Categoria desactivada",
        categoriaBorrada
    });
};

module.exports = {
    categoriasGet,
    categoriaGet,
    categoriaPost,
    categoriaPut,
    categoriaDelete
};