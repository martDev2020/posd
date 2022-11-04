const express = require('express');
// Después se instala mongoose para instancialo en la siguinete línea.
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 4201;
/**Se instancia para usar el framework express. */
const app = express();

/**Lallamado */
const wtpp_router = require('./routers/wttp');

mongoose.connect('mongodb://127.0.0.1:27017/wtapp', (err, res) => {
    if (err) {
        throw err;
    } else {
        app.listen(port, function () {
            console.log('Servidor corriendo en ' + port);
        });
    }
});
/**=================================================================
 * PARSEO DE DATOS
 ===================================================================*/

app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyparser.json({ limit: '50mb', extended: true }));

/**=================================================================
 * EVITAR ERRORES DE COTSE EN EL NAVEGADOR
 ===================================================================*/

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/', express.static('client', { redirect: false }));
app.use('/api', wtpp_router);
app.get('*', function (req, res, next) {
    res.sendFile(path.resolve('client/index.html'));
})

app.post('api/receive_sandbox', async function (req, res) {
    console.log(req.body);

})
/**=================================================================
 * SE EXPOrTA LA INSTANCIA APP
 ===================================================================*/
module.exports = app;