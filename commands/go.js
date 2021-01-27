const Discord = require("discord.js");

module.exports = {
    name: 'go',
    description: 'Travel to another location.',
    args: true,
    usage: '<location>',
    execute(client, message, args, _Player){

        var embedded = new Discord.MessageEmbed();
            embedded.setAuthor(message.member.user.tag, message.member.user.avatarURL());
        
            
            
    }
}