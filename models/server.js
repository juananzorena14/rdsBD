const express = require ("express");
const cors = require ("cors");
const {dbConnection} = require ("../database/config");

class Server {
    constructor () {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = "/api/usuarios";
        this.authPath = "/api/auth";
        this.categoriasPath = "/api/categorias";
        this.productosPath = "/api/productos";
        this.buscarPath = "/api/buscar";

        //BASE DE DATOS
        this.conectarDB();

        //MIDDLEWARES
        this.middlewares();

        //RUTAS
        this.routes();
    }

    async conectarDB () {
        await dbConnection ();
    }

    middlewares () {
        this.app.use (cors());
        //LEER JSON
        this.app.use (express.json());

        this.app.use (express.static("public"));
    }

    routes () {
        this.app.use (this.usuariosPath, require ("../routes/usuarios"));
        this.app.use (this.authPath, require ("../routes/auth"));
        this.app.use (this.categoriasPath, require ("../routes/categorias"));
        this.app.use (this.productosPath, require ("../routes/productos"));
        this.app.use (this.buscarPath, require ("../routes/buscar"));

    }

    listen () {
        this.app.listen(this.port, () => {
            console.log ("Server online port: ", this.port);
        });
    }
}

module.exports = Server;