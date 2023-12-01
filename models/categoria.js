const {Schema, model} = require ("mongoose")

const CategoriaSchema = Schema ({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "El email es obligatorio"],
    },
    img: {
        type: String,
        required: [true, "La dirección es obligatoria"]
    },
    state: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
});

module.exports = model ("Categoria", CategoriaSchema);