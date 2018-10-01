const Discord = require("discord.js");
const db = require("../database.js");
var dayCol = new Set()

exports.run = (Sysop, message, suffix) => {
  
            let args = suffix 
            let sysop =  args.slice(1).join(' ') 
            ? args.slice(1).join(' ')
            :  `Foi banido por ${message.author.username}#${message.author.discriminator}. Motivo não especificado.`;



if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('<:xguardian:476061993368027148> Desculpe, você não tem permissão de banir usuário neste servidor!');
let id = message.mentions.users.first()

    ? message.mentions.users.first().id 

    : args
    ? args[0]
    : null;
if (!id) return message.reply('<:sysalerta:469789950938841088> Mencione alguém ou especifique um ID.');

let banPerms = message.guild.member(Sysop.user).hasPermission('BAN_MEMBERS')
if (!banPerms)  return message.reply("Eu não tenho permissão para banir usuários nesse servidor.");

let user = Sysop.users.has(id) ? Sysop.users.get(id) : null;

if (!user) return message.reply("<:xguardian:476061993368027148> Não encontrei nenhum usuário.")



message.channel.send(`<:sysalerta:469789950938841088> **|** Opa ${message.author} Essa função requer confirmação. Responda essa mensagem com: **"banir"** para banir o usuário e **"cancelar"** para cancelar o banimento.`).then(() => {
message.channel.awaitMessages(res => 
(res.content == "banir" && res.author.id == message.author.id) || (res.content == 'cancelar' && res.author.id == message.author.id), { 

max: 1, time: 60000, errors: ['time'] }).then(col => {
    
if (col.first().content == 'banir') {

message.guild.fetchBans().then(bans => {
let users = bans.filter(r => r === user);
if (users.first()) 
return message.channel.send(`<:xguardian:476061993368027148> ${message.author} este usuário já está banido aqui.`);

    
let bannable = message.guild.member(id)
if (bannable) {  
if (bannable.highestRole.position >= message.member.highestRole.position) return message.reply("<:xguardian:476061993368027148> Você não pode banir este usuário pois seu cargo é menor ou igual a o do usuário a ser banido!")
    
if (!message.guild.member(user).bannable) 
return message.reply('<:xguardian:476061993368027148> Eu não posso banir esse usuário.');
    
} else {

    message.guild.ban(user, sysop);
        let server = message.guild
    const embed1 = new Discord.RichEmbed()
    .setTitle(`Ban Ação`)
    .addField(`<:banSysop:476264254606016515> Usuário banido`, user)
    //.addField(`**Motivo:**`, sysop)
    .addField(`Banido do servidor:`, server.name)
    .addField(`**Executor**`, message.author)
    .setThumbnail(user.avatarURL)
    .setColor('#00fffa')
    message.channel.send({embed1});
    user.send({embed1})
}
if (user) {

   
    message.guild.ban(user, sysop);
        let server = message.guild
    const embed = new Discord.RichEmbed()
    .setTitle(`Ban Ação`)
    .addField(`<:banSysop:476264254606016515>  Usuário banido`, user)
    //.addField(`**Motivo:**`, sysop)
    .addField(`Banido do servidor:`, server.name)
    .addField(`**Executor**`, message.author)
    .setThumbnail(user.avatarURL)
    .setColor('#00fffa')
    message.channel.send({embed});
    user.send({embed})

} else {
    message.reply('<:sysalerta:469789950938841088> Não encontrei nenhum usuário');

}
})

    }
    if (col.first().content == 'cancelar') {
 
    message.channel.send(`OK ${message.author}! Você cancelou o banimento de: ${user}`);
    }
}).catch(() => message.channel.send(`:shrug::skin-tone-2: **|** Tempo de **1** minuto passado. Solicitação de banimento expirada.`));
      
});
};