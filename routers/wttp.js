// Se instancia express.
const express = require('express');
const wtppController = require('../controllers/wttpController');
const multiparty = require('connect-multiparty');
const path = multiparty({ uploadDir: './uploads' });

const api = express.Router();

api.get('/get_conversation', wtppController.get_conversation);
api.get('/get_messages/:id', wtppController.get_messages);
api.post('/send_message', wtppController.send_message);
api.post('/upload_file', path, wtppController.upload_file);
api.get('/get_resources/:name', wtppController.get_resources);

module.exports = api;
/**Con las líneas de código anterior se puede llamar 
 * a la app.js.
 */