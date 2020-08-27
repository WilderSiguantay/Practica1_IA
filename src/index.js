//El siguiente código es un ejemplo de servidor web escrito en Node.js.

// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hola Mundo\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


//inicializaciones
const express = require('express');
const path = require('path');
const engine = require('ejs-mate');

//inicializaciones
const app = express();
require('./db');


//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine); //motor de plantillas
app.set('view engine', 'ejs');



//middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json()); //envio de datos json
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

//routes
app.use(require('./routes/index'));

//static files
app.use(express.static(path.join(__dirname, 'public')));


//start the server
app.listen(app.get('port'), () =>{
    console.log(`Server port ${app.get('port')}`)
});