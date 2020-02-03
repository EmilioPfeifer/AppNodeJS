const express = require('express');
const app = express();
//requerimientos de Middleware
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const history = require('connect-history-api-fallback');

//Conexion a DB MongodDB
const mongoose = require('mongoose');
//puerto de mongodb
const uri = 'mongodb://localhost:27017/app';
const options = {
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
}
mongoose.connect(uri, options).then(
    () => {
        console.log('Conectado a DB');
    },
    err => { err }
);

//Utilizacion
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
//configuracion para aplicaciones www-form
app.use(express.urlencoded({ extended: true }));

//Ruta raiz, llamado a la API
app.use('/api', require('./routes/persona'))

//Middleware Vue router
app.use(history());
//lamado a una direccion estatica del SO
app.use(express.static(path.join(__dirname, 'public')))


app.set('puerto', process.env.PORT || 3000);

app.listen(app.get('puerto'), function(){
    console.log('Puerto:', app.get('puerto'));
});