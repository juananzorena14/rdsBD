const {Router} = require ("express");
const {check} = require ("express-validator");
const { categoriasGet, categoriaGet, categoriaPost, categoriaPut, categoriaDelete } = require("../controllers/categorias");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {categoriaExiste, categoriaNoExiste, existeCategoriaPorId} = require("../helpers/db-validators");

const router = Router ();

//GET
router.get
    ("/", categoriasGet);

router.get(":name",
    [check("name").custom(categoriaNoExiste)],
    categoriaGet);    

//POST
router.post
    ("/",
    [validarJWT,
    check ("name", "El nombre es obligatorio").notEmpty(),
    check ("name").custom (categoriaExiste),
    check ("img", "Necesitas una imagen para mostrar la categoria").notEmpty(),
    validarCampos],
    categoriaPost);

//PUT    
router.put
    ("/:id", 
    [validarJWT,
    check ("id", "No es un ID válido").isMongoId(),
    check ("id").custom(existeCategoriaPorId),
    validarCampos],
    categoriaPut);

//DELETE
router.delete
    ("/:id",
    [validarJWT,
    check ("id", "No es un ID válido").isMongoId(),
    check ("id").custom(existeCategoriaPorId),
    validarCampos],
    categoriaDelete);

module.exports = router;