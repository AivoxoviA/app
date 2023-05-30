console.log('whatsapp process starting...');
const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();

function truncate(text) {
  const size = 8;
  return text.length > size
    ? text.slice(0, size) + '...'
    : text
  ;
}

client.on('qr', (qr) => {
  console.log('whatsapp: QR RECEIVED', truncate(qr));
  client.qr = qr;
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', message => {
  console.log('whatsapp message:', message.body);
  console.log('from:', message.from);
  if (message.body === '!ping') {
    client.sendMessage(message.from, 'pong');
  }
});

client.initialize();

exports.client = () => {
  return client;
};

