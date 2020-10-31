const { admins } =  require('../../config/default.json');
const { static: { emoji } } = require('../../utils/emojis.json');
const client = require('../..');

module.exports = (msg) => {
  admins.forEach(id => {
    client.users.fetch(id)
      .then(user => {
        user.send(msg)
          .catch(e => {
            console.warn(
              `Não foi possível entrar e contato com o usuário de ID: '${id}' que está cadastrado como um dos meus administradores!\n`+
              `Erro: "${JSON.stringify(e, null, 4)}"\n`+
              `A mensagem que deveria ser enviada era: "${msg}"`
            );
            
            user.send(
              `> ${emoji.emojicoffeeinfo} Aviso!\n`+
              '> Há uma nova mensagem no console do bot!'
            ).catch(() => {});
          });  
      }, e => console.warn(
        `Não foi encontrado um de meus administradores para enviar uma mensagem!\n`+
        `ID do user: "${id}"\n` +
        `A mensagem: "${msg}"\n` +
        `Erro: "${JSON.stringify(e, null, 4)}"`
      ));
  });
};