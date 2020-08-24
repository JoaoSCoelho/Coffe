const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./info.json");
const hex = require('./colors.json');
const Data = new Date;
// CORES PARA COLORIR TERMINAL
const consoleColors = ['\033[0m', '\033[30m', '\033[31m', '\033[32m', '\033[33m', '\033[34m', '\033[35m', '\033[36m', '\033[37m'];
// 0 = reset; 1 = black; 2 = red; 3 = green; 4 = yellow; 5 = roxo; 6 = magenta; 7 = cyan; 8 = white;
client.commands = new Discord.Collection();
client.reactCommands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const reactCommandFiles = fs.readdirSync('./reactCommands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    client.commands.set(command.name2, command);
    client.commands.set(command.name3, command);
    client.commands.set(command.name4, command);
    client.commands.set(command.name5, command);
    client.commands.set(command.name6, command);
    client.commands.set(command.name7, command);
    client.commands.set(command.name8, command);
    client.commands.set(command.name9, command);
    client.commands.set(command.name10, command);
    client.commands.set(command.name11, command);
    client.commands.set(command.name12, command);
    client.commands.set(command.name13, command);
    client.commands.set(command.name14, command);
    client.commands.set(command.name15, command);
    client.commands.set(command.name16, command);
    client.commands.set(command.name17, command);
    client.commands.set(command.name18, command);
    client.commands.set(command.name19, command);
    client.commands.set(command.name20, command);
    client.commands.set(command.name21, command);
    client.commands.set(command.name22, command);
    client.commands.set(command.name23, command);
    client.commands.set(command.name24, command);
    client.commands.set(command.name25, command);
}

for (const file of reactCommandFiles) {
    const reactCommand = require(`./reactCommands/${file}`);
    client.reactCommands.set(reactCommand.name, reactCommand);
    client.reactCommands.set(reactCommand.name2, reactCommand);
    client.reactCommands.set(reactCommand.name3, reactCommand);
    client.reactCommands.set(reactCommand.name4, reactCommand);
    client.reactCommands.set(reactCommand.name5, reactCommand);
    client.reactCommands.set(reactCommand.name6, reactCommand);
    client.reactCommands.set(reactCommand.name7, reactCommand);
    client.reactCommands.set(reactCommand.name8, reactCommand);
    client.reactCommands.set(reactCommand.name9, reactCommand);
    client.reactCommands.set(reactCommand.name10, reactCommand);
    client.reactCommands.set(reactCommand.name11, reactCommand);
    client.reactCommands.set(reactCommand.name12, reactCommand);
    client.reactCommands.set(reactCommand.name13, reactCommand);
    client.reactCommands.set(reactCommand.name14, reactCommand);
    client.reactCommands.set(reactCommand.name15, reactCommand);
}

// Função que muda o que o bot exibe no "Activity" a cada 30 segundos
let intervalActivity = null;
function changeActivity() {
    let activityId = 0
    if (intervalActivity !== null) {
        clearInterval(intervalActivity)
    }
    intervalActivity = setInterval(() => {
        switch (activityId) {
            case 0:
                client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores`, { type: "STREAMING", url: "https://github.com/joaoscoelho/Coffe" });
                activityId = 1;
                break;
            case 1:
                client.user.setActivity(`Temos ${client.users.cache.size} usuários`, { type: "STREAMING", url: "https://github.com/joaoscoelho/Coffe" });
                activityId = 2;
                break;
            case 2:
                client.user.setActivity(`Estou a ${(((new Date()) - (Data.getTime())) / 60000).toFixed(0)}m ativo`, { type: "STREAMING", url: "https://github.com/joaoscoelho/Coffe" });
                activityId = 3;
                break;
            case 3:
                const Hora = new Date
                client.user.setActivity(`Hora ${(Hora.getUTCHours() < 3) ? Hora.getUTCHours()+21 : Hora.getUTCHours()-3}:${Hora.getUTCMinutes()}`, { type: "STREAMING", url: "https://github.com/joaoscoelho/Coffe" });
                activityId = 0;
                break;
            default:
                client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores`, { type: "STREAMING", url: "https://github.com/joaoscoelho/Coffe" });
                activityId = 0;
        }
    }, 20000);
};
// Função para adicionar '0' à esquerda, para um número pequeno
function pad(number, width) {
    number += ''
    return number.length >= width ? number : new Array(width - number.length + 1).join('0') + number;
};

// Evento da largada do bot
client.on("ready", () => {
    const nameServers = client.guilds.cache.map(server => server.name);
    const qtdServers = nameServers.length;
    const qtdUsers = client.users.cache.size;
    const qtdChannels = client.channels.cache.size;
    const logChannel = client.channels.cache.get(config.logPrincipal);
    let lengthMax = ('' + qtdChannels).length;

    if (('' + qtdServers).length > lengthMax) { lengthMax = ('' + qtdServers).length };
    if (('' + qtdUsers).length > lengthMax) { lengthMax = ('' + qtdUsers).length };
    if (lengthMax < 3) { lengthMax = 3 };

    // Função que mostra o nome de todos os servidores até que eles ocupem 900 caracteres de tamanho
    function mostrarServersBlock() {
        let result = ''
        let i = 0
        while (i <= qtdServers - 1) {
            if (result.length > 900) {
                result += `[...]`
                i = Infinity
            } else {
                result += `**${i + 1} - ${nameServers[i]}**\n`
                i++
            }
        }

        return result
    }

    // Log de largada do bot no console
    console.log(consoleColors[7] + "=========================== START ===========================" + consoleColors[0]);
    console.log(`População:       ${consoleColors[6]}${pad(qtdUsers, lengthMax)}${consoleColors[0]}`);
    console.log(`Canais:          ${consoleColors[6]}${pad(qtdChannels, lengthMax)}${consoleColors[0]}`);
    console.log(`Servidores:      ${consoleColors[6]}${pad(qtdServers, lengthMax)}${consoleColors[0]}`)
    console.log(`${consoleColors[7]}------------------------- SERVIDORES ------------------------${consoleColors[0]}`);
    for (let i = 0; i <= qtdServers - 1; i++) {
        console.log(`${i + 1} - ${consoleColors[5]}${nameServers[i]}${consoleColors[0]}`)
    };
    console.log(consoleColors[7] + "=============================================================" + consoleColors[0]);


    // Log de largada na sala de log do bot
    const logEmbed = new Discord.MessageEmbed()
        .setColor(hex.lime)
        .setTitle('<:power:745693968830038106> Start')
        .setAuthor(client.user.username, client.user.avatarURL())
        .addField('<:toggleright:745693968603545632> Status', `<:users:745708185670778951> População:     **${pad(qtdUsers, lengthMax)}**\n<:messagesquarecounter:745709235387498567> Canais:             **${pad(qtdChannels, lengthMax)}**\n<:servercounter:745708185809191002> Servidores:     **${pad(qtdServers, lengthMax)}**`)
        .addField('<:server:745693968595157144> Servidores', mostrarServersBlock())
        .setTimestamp()
        .setFooter(client.user.tag, client.user.displayAvatarURL())
    logChannel.send(logEmbed)
    changeActivity()
});

// Evento acionado quando o bot entra em um novo servidor
client.on("guildCreate", guild => {
    const guildChannelCount = guild.channels.cache.size
    const guildOwnerTag = client.users.cache.get(guild.ownerID).tag
    const guildAdmins = guild.members.cache.filter(member => member.hasPermission("ADMINISTRATOR")).map(member => member.displayName).join(', ')
    const nameServers = client.guilds.cache.map(server => server.name);
    const qtdServers = nameServers.length;
    const qtdUsers = client.users.cache.size;
    const qtdChannels = client.channels.cache.size;
    const logChannel = client.channels.cache.get(config.logPrincipal);
    let lengthMax = ('' + qtdChannels).length;

    if (('' + qtdServers).length > lengthMax) { lengthMax = ('' + qtdServers).length };
    if (('' + qtdUsers).length > lengthMax) { lengthMax = ('' + qtdUsers).length };
    if (lengthMax < 3) { lengthMax = 3 };

    // Log quando o bot entra em um novo servidor
    console.log(`${consoleColors[7]}=================== ENTROU EM UM NOVO SERVIDOR ===================${consoleColors[0]}`)
    console.log(`Nome do Servidor:                   ${consoleColors[5]}${guild.name}${consoleColors[0]}`);
    console.log(`Descrição:                          ${consoleColors[4]}${(guild.description == null) ? 'Sem descrição' : `"${guild.description}"`}${consoleColors[0]}`)
    console.log(`Id do Servidor:                     ${consoleColors[6]}${guild.id}${consoleColors[0]}`);
    console.log(`População do servidor:              ${consoleColors[6]}${pad(guild.memberCount, lengthMax)}${consoleColors[0]}`)
    console.log(`Quantidade de canais do Servidor:   ${consoleColors[6]}${pad(guildChannelCount, lengthMax)}${consoleColors[0]}`)
    console.log(`Ícone do Servidor:                  ${consoleColors[4]}${(guild.iconURL() == null) ? 'Sem ícone' : guild.iconURL()}${consoleColors[0]}`);
    console.log(`Dono do servidor:                   ${consoleColors[5]}${guildOwnerTag}${consoleColors[0]}  ID: ${consoleColors[6]}${guild.owner.id}${consoleColors[0]}`);
    console.log(`Admins:                             ${consoleColors[4]}${guildAdmins}${consoleColors[0]}`)
    console.log(`${consoleColors[7]}----------------------------- STATUS -----------------------------${consoleColors[0]}`)
    console.log(`População:       ${consoleColors[6]}${pad(qtdUsers, lengthMax)}${consoleColors[0]}`);
    console.log(`Canais:          ${consoleColors[6]}${pad(qtdChannels, lengthMax)}${consoleColors[0]}`);
    console.log(`Servidores:      ${consoleColors[6]}${pad(qtdServers, lengthMax)}${consoleColors[0]}`)
    console.log(`${consoleColors[7]}==================================================================${consoleColors[0]}`)


    // Log na sala de logs do bot
    const logEmbed = new Discord.MessageEmbed()
        .setColor(hex.babyblue)
        .setTitle('<:login:745708185611927553><:server:745693968595157144> Entrei em um novo servidor')
        .setThumbnail(guild.iconURL())
        .addField('<:info:745716823424630856> Informações', `<:edit3:745722860362006608> Nome do Servidor: **${guild.name}**\n<:bookopen:745722859984257027> Descrição: ${(guild.description == null) ? '**Sem descrição**' : `**"${guild.description}"**`}\n<:hash:745722860584173682> ID do Servidor: **${guild.id}**\n<:users:745708185670778951> População do Servidor: **${pad(guild.memberCount, lengthMax)}**\n<:messagesquarecounter:745709235387498567> Canais do Servidor: **${pad(guildChannelCount, lengthMax)}**\n<:tag:745722860789563532> Dono do Servidor: **${guildOwnerTag}**\n<:taghash:745722860869255348> ID do Owner: **${guild.owner.id}**\n<:shield:745722860718391406> Admins: **${guildAdmins}**`)
        .addField('<:toggleright:745693968603545632> Status', `<:users:745708185670778951> População:     **${pad(qtdUsers, lengthMax)}**\n<:messagesquarecounter:745709235387498567> Canais:             **${pad(qtdChannels, lengthMax)}**\n<:servercounter:745708185809191002> Servidores:     **${pad(qtdServers, lengthMax)}**`)
        .setTimestamp()
        .setFooter(client.user.tag)
    logChannel.send(logEmbed)


    changeActivity();

});

// Evento acionado quando o bot sai de algum servidor
client.on("guildDelete", guild => {    
    const guildOwnerTag = client.users.cache.get(guild.ownerID).tag
    const guildAdmins = guild.members.cache.filter(member => member.hasPermission("ADMINISTRATOR")).map(member => member.displayName).join(', ')
    const nameServers = client.guilds.cache.map(server => server.name);
    const qtdServers = nameServers.length;
    const qtdUsers = client.users.cache.size;
    const qtdChannels = client.channels.cache.size;
    const logChannel = client.channels.cache.get(config.logPrincipal);
    let lengthMax = ('' + qtdChannels).length;

    if (('' + qtdServers).length > lengthMax) { lengthMax = ('' + qtdServers).length };
    if (('' + qtdUsers).length > lengthMax) { lengthMax = ('' + qtdUsers).length };
    if (lengthMax < 3) { lengthMax = 3 };

    // Log quando o bot sai de um servidor
    console.log(`${consoleColors[7]}=================== SAIU DE UM SERVIDOR ===================${consoleColors[0]}`)
    console.log(`Nome do Servidor:                   ${consoleColors[5]}${guild.name}${consoleColors[0]}`);
    console.log(`Descrição:                          ${consoleColors[4]}${(guild.description == null) ? 'Sem descrição' : `"${guild.description}"`}${consoleColors[0]}`)
    console.log(`Id do Servidor:                     ${consoleColors[6]}${guild.id}${consoleColors[0]}`);
    console.log(`População do servidor:              ${consoleColors[6]}${pad(guild.memberCount, lengthMax)}${consoleColors[0]}`)
    console.log(`Ícone do Servidor:                  ${consoleColors[4]}${(guild.iconURL() == null) ? 'Sem ícone' : guild.iconURL()}${consoleColors[0]}`);
    console.log(`Dono do servidor:                   ${consoleColors[5]}${guildOwnerTag}${consoleColors[0]}  ID: ${consoleColors[6]}${guild.owner.id}${consoleColors[0]}`);
    console.log(`Admins:                             ${consoleColors[4]}${guildAdmins}${consoleColors[0]}`)
    console.log(`${consoleColors[7]}----------------------------- STATUS -----------------------------${consoleColors[0]}`)
    console.log(`População:       ${consoleColors[6]}${pad(qtdUsers, lengthMax)}${consoleColors[0]}`);
    console.log(`Canais:          ${consoleColors[6]}${pad(qtdChannels, lengthMax)}${consoleColors[0]}`);
    console.log(`Servidores:      ${consoleColors[6]}${pad(qtdServers, lengthMax)}${consoleColors[0]}`)
    console.log(`${consoleColors[7]}==================================================================${consoleColors[0]}`)


    // Log na sala de logs do bot
    const logEmbed = new Discord.MessageEmbed()
        .setColor(hex.darkred)
        .setTitle('<:server:745693968595157144><:logout:745708185540886688> Saí de um servidor')
        .setThumbnail(guild.iconURL())
        .addField('<:info:745716823424630856> Informações', `<:edit3:745722860362006608> Nome do Servidor: **${guild.name}**\n<:bookopen:745722859984257027> Descrição: ${(guild.description == null) ? '**Sem descrição**' : `**"${guild.description}"**`}\n<:hash:745722860584173682> ID do Servidor: **${guild.id}**\n<:users:745708185670778951> População do Servidor: **${pad(guild.memberCount, lengthMax)}**\n<:tag:745722860789563532> Dono do Servidor: **${guildOwnerTag}**\n<:taghash:745722860869255348> ID do Owner: **${guild.owner.id}**\n<:shield:745722860718391406> Admins: **${guildAdmins}**`)
        .addField('<:toggleright:745693968603545632> Status', `<:users:745708185670778951> População:     **${pad(qtdUsers, lengthMax)}**\n<:messagesquarecounter:745709235387498567> Canais:             **${pad(qtdChannels, lengthMax)}**\n<:servercounter:745708185809191002> Servidores:     **${pad(qtdServers, lengthMax)}**`)
        .setTimestamp()
        .setFooter(client.user.tag)
    logChannel.send(logEmbed)


    changeActivity();

});

// Evento acionado quando alguém manda alguma mensagem no chat
client.on("message", async message => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();
    const firstWord = message.content.trim().split(/ +/g).shift().toLowerCase();
    const logErrorChannel = client.channels.cache.get(config.logErroComandos);

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    const botMembro = message.guild.member(client.user.id)
    const permissoesBot = message.channel.memberPermissions(botMembro)
    const podeEnviarMsg = permissoesBot.has("SEND_MESSAGES")
    const podeAddReactions = permissoesBot.has("ADD_REACTIONS")
    const podeCriarInvite = permissoesBot.has("CREATE_INSTANT_INVITE");
    const podeManageMessages = permissoesBot.has("MANAGE_MESSAGES");
    if (firstWord === `<@${client.user.id}>`) { 
        if(podeEnviarMsg) {
            message.reply(`Alguém me chamou??🤗 Se estiver precisando de ajuda, use **${config.prefix}ajuda**`) 
        }
        return;
    }
    if (!message.content.startsWith(config.prefix)) return;
    if (!client.commands.has(comando)) {
        if(podeEnviarMsg && podeManageMessages) {
            const resp = await message.reply(`eu não conheço esse comando<:terminal:745279127195615343>, use **${config.prefix}ajuda** para saber todos os meus comandos!`);
            resp.delete({timeout: 5000})
        }
        return;
    }  
    message.guild.emojis.cache.filter(emoji => !emoji.animated)
    try {
        client.commands.get(comando).execute(message, args, comando, client);
    } catch (error) {
        const errorEmbed = new Discord.MessageEmbed()
            .setColor(hex.orangered)
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle(`Erro ao executar comando ${comando}`)
            .setDescription(`<:alertcircle:745709428937981992> Houve um erro ao executar o comando **${comando}**!`)
            .addField(`<:server:745693968595157144> Servidor:`, `**${message.guild.name}**`)
            .addField(`<:user:745735266228240535> Quem executou:`, `**${message.author.tag}\n${message.author.id}**`)
            .addField(`<:unlock:745735270569214083> Permissões:`, `**${message.member.permissions.toArray().join('\n')}**`)
            .addField(`<:tag:745722860789563532> Dono do servidor:`, `**${message.guild.owner.user.tag}**`)
            .addField(`<:xcircle:745735267448520704> Erro:`, error)
            .setThumbnail(message.guild.iconURL())
            .setTimestamp()
            .setFooter(`${client.user.tag} log sistem`, client.user.displayAvatarURL())
        if (podeEnviarMsg) {
            await message.reply('<:alertcircle:745709428937981992> Houve um erro ao executar esse comando! A Equipe já foi informada!')
        } else if (podeAddReactions) {
            await message.react('alertcircle:745709428937981992')
        }
        console.log(error);
        if (podeCriarInvite) {
            await message.channel.createInvite({ maxAge: 0, reason: `Houve um erro ao executar um comando do bot ${client.user.tag} e os administradores precisam ser chamados para averiguar o problema` }).then(invite => {
                errorEmbed.setURL(`https://discord.gg/${invite.code}`)
            })
        }
        logErrorChannel.send(errorEmbed)
    }
});

// Evento acionado quando algum usuário adiciona uma reação em uma mensagem
client.on("messageReactionAdd", async (message, user) => {
    const logErrorChannel = client.channels.cache.get(config.logErroComandos);
    if (user.id === client.user.id) return;
    if (user.bot) return;
    if (client.reactCommands.has(message.emoji.name)) {
        try {
            client.reactCommands.get(message.emoji.name).execute(message, user, client)
        } catch (error) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor(hex.orange)
                .setAuthor(user.username, user.displayAvatarURL())
                .setTitle(`Erro ao executar ação na reação do emoji "${message.emoji.name}"`)
                .setDescription(`<:alertcircle:745709428937981992> Houve um erro ao reagir com" ${message.emoji.name}"`)
                .addField(`<:server:745693968595157144> Servidor:`, `**${(message.message.guild === null) ? 'Sem servidor (DM)' : message.message.guild.name}**`)
                .addField(`<:user:745735266228240535> Quem executou:`, `**${user.tag}\n${user.id}**`)
                .addField(`<:messagesquare:745708185490292946> Canal`, `**${(message.message.channel.name === undefined) ? '(DM)' : message.message.channel.name}**`)
                .addField(`<:xcircle:745735267448520704> Erro:`, error)
                .setThumbnail(user.displayAvatarURL())
                .setTimestamp()
                .setFooter(`${client.user.tag} log sistem`, client.user.displayAvatarURL())
            console.log(error);
            logErrorChannel.send(errorEmbed)
        }
    } else if(client.reactCommands.has(message.emoji.identifier)) {
        try {
            client.reactCommands.get(message.emoji.identifier).execute(message, user, client)
        } catch (error) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor(hex.orange)
                .setAuthor(user.username, user.displayAvatarURL())
                .setTitle(`Erro ao executar ação na reação do emoji "<:${message.emoji.identifier}>"`)
                .setDescription(`<:alertcircle:745709428937981992> Houve um erro ao reagir com "<:${message.emoji.identifier}>"`)
                .addField(`<:server:745693968595157144> Servidor:`, `**${(message.message.guild === null) ? 'Sem servidor (DM)' : message.message.guild.name}**`)
                .addField(`<:user:745735266228240535> Quem executou:`, `**${user.tag}\n${user.id}**`)
                .addField(`<:messagesquare:745708185490292946> Canal`, `**${(message.message.channel.name === undefined) ? '(DM)' : message.message.channel.name}**`)
                .addField(`<:xcircle:745735267448520704> Erro:`, error)
                .setThumbnail(user.displayAvatarURL())
                .setTimestamp()
                .setFooter(`${client.user.tag} log sistem`, client.user.displayAvatarURL())
            console.log(error);
            logErrorChannel.send(errorEmbed)
        }
    }
});

// Evento acionado quando o bot se depara com algum erro
client.on("error", error => {
    console.log("Aconteceu um erro aqui")
    const logErrorChannel = client.channels.cache.get(config.logErro);
    const errorEmbed = new Discord.MessageEmbed()
        .setColor(hex.red)
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setTitle(`Aconteceu um erro!`)
        .addField(`<:xcircle:745735267448520704> Erro`, error)
        .addField(`<:edit3:745722860362006608> Nome`, error.name)
        .addField(`<:paper:745741542861307915> Stack`, error.stack)
        .addField(`<:messagesquare:745708185490292946> Mensagem`, error.message)
        .setTimestamp()
        .setFooter(`${client.user.tag} log sistem`, client.user.displayAvatarURL())
    logErrorChannel.send(errorEmbed)
    console.log(error)
});

process.on("unhandledRejection", (reason) => {
    const logErrorChannel = client.channels.cache.get(config.logErro);
    const embedError = new Discord.MessageEmbed()
        .setColor(hex.yellow)
        .setTitle(`<:xcircle:745735267448520704> Aconteceu um erro: **unhandledRejection**`)
        .setDescription(reason.stack)
        .setTimestamp()
        .setFooter(client.user.tag, client.user.displayAvatarURL())
    logErrorChannel.send(embedError)
    console.error(reason)
})

process.on("uncaughtExceptionMonitor", (err, origin) => {
    const logErrorChannel = client.channels.cache.get(config.logErro);
    const embedError = new Discord.MessageEmbed()
        .setColor(hex.darkred)
        .setTitle(`<:xcircle:745735267448520704> Aconteceu um erro: **uncaughtException**`)
        .setDescription(`${err} | ${origin}`)
        .setTimestamp()
        .setFooter(client.user.tag, client.user.displayAvatarURL())
    logErrorChannel.send(embedError)
    console.error(err, origin)
})

process.on("warning", warning => {
    const logErrorChannel = client.channels.cache.get(config.logErro);
    const embedError = new Discord.MessageEmbed()
        .setColor(hex.yellow)
        .setTitle(`<:alertcircle:745709428937981992> Aconteceu um aviso: **Warning**`)
        .setDescription(`${warning.name}\n\n${warning.message}\n\n${warning.stack}`)
        .setTimestamp()
        .setFooter(client.user.tag, client.user.displayAvatarURL())
    logErrorChannel.send(embedError)
    console.error(warning, warning.name, warning.message, warning.stack)
});

client.login(config.token)