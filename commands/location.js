const Discord = require("discord.js");
const jsonLocation = require('../json/locations.json')

module.exports = {
    name: 'location',
    description: 'View your current location or list all locations',
    args: false,
    aliases: ['loc'],
    usage: '<optional:list>',
    execute(client, message, args){

        var embedded = new Discord.MessageEmbed();
        embedded.setColor('#03b6fc')
                .setAuthor(message.member.user.tag, message.member.user.avatarURL());

        if(args[0] != undefined && args[0].toLowerCase() == "list")
        {
            console.log("[LOCATION] Displaying location list.");

            embedded.setDescription(`Travel to a location by typing the command \`${process.env.BOT_PREFIX}go <location>\` \n You can view the map by typing the command \`${process.env.BOT_PREFIX}map\``)
            jsonLocation.forEach(loc => {
                embedded.addField(`${loc.emoji} ${loc.name}`,`${loc.description}`)
            })

            return message.channel.send(embedded);
        }
    }
}