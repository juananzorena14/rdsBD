const esAdmin = (req, res, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: "Hay que validar el token antes que el rol"
        });
    }

    //OBTENER DATOS
    const {role, name} = req.usuario

    //AVERIGUAR SI ES ADMIN
    if (role!=="ADMIN"){
        return res.status(401).json({
            msg:`${name} no es administrador`
        });
    }

    next();
}

module.exports = {
    esAdmin
}