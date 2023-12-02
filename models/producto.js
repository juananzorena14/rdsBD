const {Schema, model} = require ("mongoose")

const ProductoSchema = Schema ({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "El email es obligatorio"],
    },
    price: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    img: {
        type: String,
        required: [true, "La dirección es obligatoria"]
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    state: {
        type: Boolean,
        default: true
    }
});

module.exports = model ("Producto", ProductoSchema);

