const {request, response} = require ("express");
const jwt = require ("jsonwebtoken");
const Usuario = require ("../models/usuario");

const validarJWT = async (req = request , res = response , next) => {
    const token = req.header ("x-token")

    //VALIDAR TOKEN
    if (!token) {
        return res.status(401).json({
            msg: "No se reconoce el token",
        })
    };

    try {
        //OBTENER PAYLOAD
        const {uid} = jwt.verify (token,process.env.SECRETORPRIVATEKEY)

        //LEER DATOS DE USUARIO
        const usuario = await Usuario.findById(uid)

        //SI EL USUARIO NO EXISTE
        if (!usuario){
            return res.status(401).json({
                msg: "Token no válido, usuario no existe"
            });
        }

        //VERIFICAR SI ESTA ACTIVO
        if (!usuario.state){
            return res.status(401).json({
                msg: "Token no válido, usuario inactivo"
            });
        }

        //GUARDAR EN LA REQ LOS DATOS DEL USUARIO VALIDADO

        next();
    } catch (error){
        console.log(error);
        return res.status(401).json({
            msg: "Token no válido"
        });
    }


}

module.exports = {
    validarJWT
}