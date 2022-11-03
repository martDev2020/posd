/**Línea extraído de la documentación,
 * https://github.com/messagebird/messagebird-nodejs
 */
const messagebird = require('messagebird')('wRfBUddmbES5BF9jK9IbBCVwb');
var fetch = require('node-fetch');
var fs = require('fs');
var path = require('path');

const get_conversation = async function (req, res) {
  const response = await fetch('https://conversations.messagebird.com/v1/conversations', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'AccessKey wRfBUddmbES5BF9jK9IbBCVwb',
    }
  });

  const data = await response.json();
  res.status(200).send({ data });
}

const get_messages = async function (req, res) {
  let id = req.params['id'];
  const response = await fetch('https://conversations.messagebird.com/v1/conversations/' + id + '/messages?limit=20', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'AccessKey wRfBUddmbES5BF9jK9IbBCVwb',
    }
  });

  const data = await response.json();
  res.status(200).send({ data });
}

const send_message = async function (req, res) {
  let body = req.body;
  const response = await fetch('https://conversations.messagebird.com/v1/send', {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'AccessKey wRfBUddmbES5BF9jK9IbBCVwb',
    }
  });

  const data = await response.json();
  res.status(200).send({ data });
}

const upload_file = async function (req, res) {

  var img_path = (req.files.file.path).split('\\')[1];

  var url = 'http://127.0.0.1:4201/api/get_resources/' + img_path;

  res.status(200).send({ data: url });
}

const get_resources = async function (req, res) {
  var name = req.params['name'];

  fs.stat('./uploads/' + name, function (err) {
    if (err) {
      let path_img = './uploads/default.png';
      res.status(200).sendFile(path.resolve(path_img));
    } else {
      let path_img = './uploads/' + name;
      res.status(200).sendFile(path.resolve(path_img));
    }
  });

}


module.exports = {
  get_conversation,
  get_messages,
  send_message,
  upload_file,
  get_resources
}