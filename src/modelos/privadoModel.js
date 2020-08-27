const conexion = require("../db")


module.exports = {
    async insertar(nombre, carne, dpi, correo, semestre, año, numerogrupo) {
        let resultados = await conexion.query(`insert into privado
        (nombre, carne, dpi, correo, semestre, anio, numerogrupo)
        values
        ($1, $2, $3, $4, $5,$6,$7)`, [nombre, Number(carne),Number(dpi) ,correo, Number(semestre) , Number(año) , Number(numerogrupo)]);
        return resultados;
    },
    async obtenerTodos(){
        const resultados = await conexion.query("select * from privado");
        return resultados.rows;
    },
    async obtener(carne, semestre,año) {
        const resultados = await conexion.query(`select id, nombre, carne, dpi, correo, 
        semestre, anio, numerogrupo from privado where carne = $1 and semestre = $2 and anio = $3`, [carne,semestre,año]);
        return resultados.rows;
    },
    async obtenerPorGrupo(numerogrupo) {
        const resultados = await conexion.query(`select * from privado where numerogrupo = $1`, [numerogrupo]);
        return resultados.rows;
    },
    async actualizar(id, nombre, precio) {
        const resultados = conexion.query(`update productos
        set nombre = $1,
        precio = $2
        where id = $3`, [nombre, precio, id]);
        return resultados;
    },
    async eliminar(id) {
        const resultados = conexion.query(`delete from productos
        where id = $1`, [id]);
        return resultados;
    },
}