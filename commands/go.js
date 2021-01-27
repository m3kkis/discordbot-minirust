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

        var destination = args[0].toLowerCase();

        if(_Player.location == destination)
        {
            console.log("[GO] Is already at " + destination);

            message.delete();

            embedded.setColor('#ff4f4f')
                    .setDescription(`You're already at that location.`)
                    .setFooter(`___\nType "${process.env.BOT_PREFIX}loc me" to know where you are.`);

            return message.channel.send(embedded);
        }
        
        var location = jsonLocations.filter((loc) => {
            if(_Player.location == "base")
            {
                return loc.id === _Player.base.location;
            }
            else
            {
                return loc.id === destination;
            }
            
        });

        if(location.length > 0)
        {
            if( location[0].from.includes(_Player.location) && location[0].id == destination)
            {
                message.delete();

                console.log("[GO] is traveling to " + destination);

                _Player.location = destination;
                _Player.save();

                /*
                embedded.setColor('#78de87')
                    .setDescription(`You've traveled to the **${location[0].emoji} ${location[0].name}**`);
                */

                embedded.setColor('#78de87')
                        .setDescription(`You've successfully traveled to the location.`)
                        .setFooter(`___\nType "${process.env.BOT_PREFIX}loc me" to know where you are.`);

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
        else if(destination == "base"){

            if(_Player.base.id != undefined)
            {
                if(_Player.location == _Player.base.location)
                {
                    message.delete();
                    console.log("[GO] is traveling to " + destination);

                    _Player.location = destination;
                    _Player.save();

                    embedded.setColor('#78de87')
                            .setDescription(`You've successfully traveled to the location.`)
                            .setFooter(`___\nType "${process.env.BOT_PREFIX}loc me" to know where you are.`);

                    return message.channel.send(embedded);
                }
                else
                {
                    console.log("[GO] Not same location as base or inside base already.");
                    embedded.setColor('#ff4f4f')
                        .setDescription(`You're not in same location as your base or you're already in your base.`)
                        .setFooter(`___\nType "${process.env.BOT_PREFIX}base" to view your base location.`);
                    return message.channel.send(embedded);
                }
            }
            else
            {
                console.log("[GO] Doesnt have a base.");

                embedded.setColor('#ff4f4f')
                        .setDescription(`You don't have a base.`)
                        .setFooter(`___\nType "${process.env.BOT_PREFIX}base build" to build a base at the current location.`);
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