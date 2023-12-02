const {Router} = require ("express");
const {check} = require ("express-validator");
const {categoriasGet, categoriaGet, categoriaPost, categoriaPut, categoriaDelete} = require("../controllers/categorias");
const {validarCampos} = require("../middlewares/validar-campos");
const {validarJWT} = require("../middlewares/validar-jwt");
const {categoriaExiste, categoriaNoExiste, existeCategoriaPorId} = require("../helpers/db-validators");
const {esAdmin} = require ("../middlewares/validar-rol");

const router = Router ();

//GET
router.get("/",categoriasGet);
router.get(
    "/:name",
    [check("name").custom(categoriaNoExiste),
    validarCampos
    ],categoriaGet
);    

//POST
router.post(
    "/",
    [validarJWT,
    esAdmin,
    check ("name", "El nombre es obligatorio").notEmpty(),
    check ("name").custom (categoriaExiste),
    check ("img", "Necesitas una imagen para mostrar la categoria").notEmpty()
    ],categoriaPost
);

//PUT    
router.put(
    "/:id", 
    [validarJWT,
    esAdmin,
    check ("id", "No es un ID válido").isMongoId(),
    check ("id").custom(existeCategoriaPorId),
    validarCampos
    ],categoriaPut
);

//DELETE
router.delete(
    "/:id",
    [validarJWT,
    esAdmin,
    check ("id", "No es un ID válido").isMongoId(),
    check ("id").custom(existeCategoriaPorId),
    validarCampos
    ],categoriaDelete
);

module.exports = router;