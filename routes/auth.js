const {Router} = require ("express");
const {check} = require ("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const {login} = require ("../controllers/auth");
const router = Router ();

router.post("/login",
    [check ("email", "El correo es obligatorio").notEmpty(),
    check ("email", "El correo es incorrecto").isEmail(),
    check ("password", "La contraseña es obligatoria").notEmpty(),
    //check ("password", "La contraseña debe tener mínimo 8 caracteres y max 16").matches(/^.{8,16}$/),
    validarCampos
    ],
    login);

module.exports = router;


