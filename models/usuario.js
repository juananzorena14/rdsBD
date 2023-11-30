const {Schema, model} = require ("mongoose")

const UsuarioSchema = Schema ({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    address: {
        type: String,
        required: [true, "La dirección es obligatoria"]
    },
    role: {
        type: String,
        enum: ["ADMIN","USER"],
        default: "USER"
    },
    state: {
        type: Boolean,
        default: true
    },
});

UsuarioSchema.methods.toJSON = function () {
    const {__v, password,_id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model ("Usuario", UsuarioSchema);

