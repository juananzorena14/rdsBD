const {Router} = require("express");
const {check} = require("express-validator");
const {productoExiste, existeProductoPorId, productoNoExiste} = require("../helpers/db-validators");
const {validarCampos} = require("../middlewares/validar-campos");
const {validarJWT} = require("../middlewares/validar-jwt");
const {esAdmin} = require("../middlewares/validar-role");
const {productoGet, productosGet, productoPost, productoPut, productoDelete} = require("../controllers/productos");

const router = Router();

//GET
router.get("/", productosGet);
router.get(
    "/:id",
    [check("id", "El id no es válido").isMongoId(),
    check("id").custom(productoNoExiste),
    validarCampos,
    ],productoGet
);

//POST
router.post(
    "/",
    [validarJWT,
    esAdmin,
    check("name", "El nombre es obligatorio").notEmpty(),
    check ("name").custom (productoExiste),
    check ("img", "Necesitas una imagen para mostrar la categoria").notEmpty(),
    check ("description", "El cliente no va a saber que ingredientes tiene el plato").notEmpty(),
    check ("price", "Cuanto cuesta?").notEmpty(),
    check("categoria", "La categoría es obligatoria").notEmpty(),
    validarCampos,
    ],productoPost
);

//PUT
router.put(
    "/:id",
    [validarJWT,
    esAdmin,
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
    ],productoPut
);

//DELETE
router.delete(
    "/:id",
    [validarJWT,
    esAdmin,
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
    ],productoDelete
);

module.exports = router;