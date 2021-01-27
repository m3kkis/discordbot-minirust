const Discord = require("discord.js");
const jsonLocation = require('../json/locations.json')

module.exports = {
    name: 'map',
    description: 'View the minirust map.',
    args: false,
    execute(client, message, args){

        console.log("[MAP] Displaying map.");
        const attachment = new Discord.MessageAttachment('./images/map_draft.png', 'map_draft.png');
        var embedded = new Discord.MessageEmbed();
        embedded.setColor('#03b6fc')
                .setAuthor(message.member.user.tag, message.member.user.avatarURL())
                .attachFiles(attachment)
                .setImage('attachment://map_draft.png');

        return message.channel.send(embedded);
    }
}