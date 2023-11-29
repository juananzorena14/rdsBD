//ACCESO A LOS MÉTODOS
const {request, response} = require ("express")

const usuariosGet = (req = request, res) => {
    //CONSULTA DE LIMIT Y PAGE
    const {limit, page} = req.query

    res.json({
        message: "GET usuarios - Controllers",
        limit,
        page, 
    }); 
};
const usuarioPost = (req, res) => {
    const {nombre, correo} = req.body;
    res.json({
        message: "POST usuario - Controllers",
        nombre, 
        correo,
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