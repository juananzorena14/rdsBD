const {Router} = require ("express");
const {check} = require ("express-validator");
const { usuariosGet, usuarioPost, usuarioPut, usuarioDelete } = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { emailExiste, existeUsuarioPorId, existeUsuarioPorState } = require("../helpers/db-validators");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router ();

//GET
router.get
    ("/",
    [validarJWT], 
    usuariosGet);

//POST
router.post
    ("/",
    [check ("name", "El nombre es obligatorio").notEmpty(),
    check ("password","La contraseña debe tener más de 6 caracteres").isLength({min:6}),
    check ("email", "El email no es válido").isEmail(),
    check ("email").custom(emailExiste),
    validarCampos],
    //check ("role", "No es un rol válido").isIn(["USER_ROLE", "ADMIN_ROLE"]),
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
    check ("id", "No es un ID válido").isMongoId(),
    check ("id").custom(existeUsuarioPorId),
    check ("state").custom(existeUsuarioPorState),
    validarCampos],
    usuarioDelete);

module.exports = router