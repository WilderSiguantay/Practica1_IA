
const {Router, json} = require('express');
const router = Router();
const privadosModel = require("../modelos/privadoModel");

router.get('/', function (req, res, next) {
    
    privadosModel.obtenerTodos().then(privados => {console.log(privados);
        res.render("ver", {privados: privados,});
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo productos");
    });
});
router.get('/agregar', function (req, res, next) {
    res.render("insertar");
});

router.post('/insertar', function (req, res, next) {
    // Obtener el nombre y precio. Es lo mismo que
    // const nombre = req.body.nombre;
    // const precio = req.body.precio;
    const { nombre, carne, dpi, email, semestre, anio, grupo } = req.body;
    console.log(req.body);
    if (!nombre || !dpi || !carne || !email || !semestre || !anio || !grupo) {
        return res.status(500).send("Datos incompletos");
    }
    // Si todo va bien, seguimos
    privadosModel
        .insertar(nombre, carne, dpi, email, semestre, anio, grupo)
        .then(idEstudianteIngresado => {
            res.redirect("/");
        })
        .catch(err => {
            return res.status(500).send("Error insertando estudiante");
        });
});

router.get('/consultarEstudiante', function (req, res, next) {
    privados = ""
    res.render("consultarestudiante", {
        privados: privados,
    });
});

router.get('/consultarGrupo', function (req, res, next) {
    privados = ""
    res.render("consultargrupo", {
        privados: privados,
    });
});

//CONSULTA GRUPO
router.post('/consultarGrupo', function (req, res, next) {
    const grupo = req.body.grupo;
    privadosModel.obtenerPorGrupo(grupo).then(privados => {console.log(privados);
        res.render("consultargrupo", {privados: privados,});
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo datos");
    });
    
});

//CONSULTA GRUPO
router.post('/consultarEstudiante', function (req, res, next) {
    const { carne,  semestre, anio } = req.body;
    privadosModel.obtener(carne, semestre, anio) .then(privados => {console.log(privados);
    res.render("consultarestudiante", {privados: privados,});
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo datos");
    });
    
});


router.get('/eliminar/:id', function (req, res, next) {
    privadosModel
        .eliminar(req.params.id)
        .then(() => {
            res.redirect("/productos");
        })
        .catch(err => {
            return res.status(500).send("Error eliminando");
        });
});
router.get('/editar/:id', function (req, res, next) {
    privadosModel
        .obtenerPorId(req.params.id)
        .then(producto => {
            if (producto) {
                res.render("productos/editar", {
                    producto: producto,
                });
            } else {
                return res.status(500).send("No existe producto con ese id");
            }
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo producto");
        });
});
router.post('/actualizar/', function (req, res, next) {
    // Obtener el nombre y precio. Es lo mismo que
    // const nombre = req.body.nombre;
    // const precio = req.body.precio;
    const { id, nombre, precio } = req.body;
    if (!nombre || !precio || !id) {
        return res.status(500).send("No hay suficientes datos");
    }
    // Si todo va bien, seguimos
    privadosModel
        .actualizar(id, nombre, precio)
        .then(() => {
            res.redirect("/productos");
        })
        .catch(err => {
            return res.status(500).send("Error actualizando producto");
        });
});

module.exports = router;