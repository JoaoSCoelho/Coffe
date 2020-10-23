const Discord = require('discord.js'); // Requerimento da biblioteca Discord.js
const { token } = require('./config/auth.json'); // TOKEN para logar o bot
const client = new Discord.Client(); // Instância do Client

client.login(token).then(() => {
  require('./controllers/botAuthController');

  const { handlerLoader } = require('./functions');
  handlerLoader();
});

module.exports = client;