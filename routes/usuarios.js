const {Router} = require ("express");
const {check} = require ("express-validator");
const { usuariosGet, usuarioPost, usuarioPut, usuarioDelete } = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { emailExiste, existeUsuarioPorId} = require("../helpers/db-validators");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdmin } = require ("../middlewares/validar-rol");

const router = Router ();

//GET
router.get
    ("/",
    [validarJWT,
    esAdmin], 
    usuariosGet);

//POST
router.post
    ("/",
    [check ("name", "El nombre es obligatorio").notEmpty(),
    check ("password","La contraseña debe tener más de 6 caracteres").isLength({min:6}),
    check ("email", "El email no es válido").isEmail(),
    check ("email").custom(emailExiste),
    validarCampos],
    usuarioPost);

//PUT    
router.put
    ("/:id", 
    [validarJWT,
    check ("id", "No es un ID válido").isMongoId(),
    check ("id").custom(existeUsuarioPorId),
    validarCampos],
    usuarioPut);

//DELETE
router.delete
    ("/:id",
    [validarJWT,
    esAdmin,
    check ("id", "No es un ID válido").isMongoId(),
    check ("id").custom(existeUsuarioPorId),
    //check ("state").custom(existeUsuarioPorState),
    validarCampos],
    usuarioDelete);

module.exports = router