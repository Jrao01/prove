const express = require('express');
const cookieparser = require('cookie-parser')
const app = express();
const path = require('path');
const sequelize = require('./config/database.js')

const logger = require('morgan');

const port = 3000
const UserRoutes = require('./routes/userRoutes.js');
//const sequelize = require('./config/database.js');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieparser());
app.use(express.static(path.join(__dirname,'public')))
app.use('/', UserRoutes)


sequelize
    .authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente {Coding JAR}');
        // Sincronización del modelo con la base de datos
        return sequelize.sync({ force: false });
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos {Coding JAR}:', error.message);
    });


app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(function ( err,req, res, next ){
    res.locals.message = err.message;
    res.locals.error= req.app.get('env') === 'development' ? err : {};
    res.status (err.status || 500);
    res.render('error')
});


app.listen(port, ()=>{
    console.log(`puerto iniciado exitosamente en el puerto ${port}`)
})