const {Router} = require ("express");
const {check} = require ("express-validator");
const { usuariosGet, usuarioPost, usuarioPut, usuarioDelete } = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router ();

//GET
router.get("/", usuariosGet);

//POST
router.post("/",
    [check ("name", "El nombre es obligatorio").notEmpty(),
    check ("password","La contraseña debe tener más de 6 caracteres").isLength({min:6}),
    check ("email", "El email no es válido").isEmail()],
    //check ("role", "No es un rol válido").isIn(["USER_ROLE", "ADMIN_ROLE"]),
    validarCampos,
    usuarioPost);

//PUT    
router.put("/:id", usuarioPut);

//DELETE
router.delete("/", usuarioDelete);

module.exports = router