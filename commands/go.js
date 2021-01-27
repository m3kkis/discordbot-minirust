const Discord = require("discord.js");
const jsonLocations = require('../json/locations.json')

module.exports = {
    name: 'go',
    description: 'Travel to another location.',
    args: true,
    usage: '<location>',
    execute(client, message, args, _Player){

        var embedded = new Discord.MessageEmbed();
            embedded.setAuthor(message.member.user.tag, message.member.user.avatarURL());
        
        var location = jsonLocations.filter((loc) => {
            return loc.id === args[0];
        });

        if(location.length > 0)
        {
            if( location[0].from.includes(_Player.location))
            {
                console.log("[GO] Can travel");

                _Player.location = args[0];
                _Player.save();

                embedded.setColor('#78de87')
                    .setDescription(`You've traveled to the **${location[0].emoji} ${location[0].name}**`);

                return message.channel.send(embedded);
            }
            else
            {
                console.log("[GO] Not in adjacent location");
                embedded.setColor('#ff4f4f')
                    .setDescription(`Must be adjacent to your destination tile.`)
                    .setFooter(`___\nType "${process.env.BOT_PREFIX}map" to view valid paths.`);
                return message.channel.send(embedded);
            }
        }
        else
        {
            console.log("[GO] Location doesn't exist");
            embedded.setColor('#ff4f4f')
                    .setDescription(`That doesn\'t seem to be a valid location name.`)
                    .setFooter(`___\nType "${process.env.BOT_PREFIX}location list" to view all available locations.`);
            return message.channel.send(embedded);
        }

    }
}