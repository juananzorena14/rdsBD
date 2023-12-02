const {Schema, model} = require ("mongoose")

const CategoriaSchema = Schema ({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true
    },
    img: {
        type: String,
        required: [true, "La imagen es obligatoria"]
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