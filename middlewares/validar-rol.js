const esAdmin = (req, res, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: "Hay que validar el token antes que el rol",
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
};

const tieneRol = (...roles) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: "Se quiere verificar el rol sin haber validado el token",
            });
        }
        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
              msg: `El servicio requiere alguno de estos roles ${roles}`,
            });
          }

          next();
    };
};

module.exports = {
    esAdmin,
    tieneRol
};