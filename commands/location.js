const Discord = require("discord.js");
const jsonLocation = require('../json/locations.json')
const Players = require('../models/player'); 

module.exports = {
    name: 'location',
    description: 'View players around you, list locations or view your location',
    args: false,
    aliases: ['loc'],
    usage: '<optional:list>',
    execute(client, message, args, _Player){

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
        else if(args[0] != undefined && args[0].toLowerCase() == "me")
        {
            console.log("[LOCATION] Displaying user location.");

            let idx = jsonLocation.findIndex(x => x.id === _Player.location);

            if(_Player.location == "base")
            {
                embedded.setDescription(`You are currently in your **:house: ${_Player.location}**`)
            }
            else
            {
                embedded.setDescription(`You are currently in the **${jsonLocation[idx].emoji} ${_Player.location}**`)
            }

            return message.author.send(embedded);
        }
        else
        {

            Players.find({}).then( _AllPlayers => {
    
                var arrPlayers = [];
                var arrBases = [];

                var playerFieldsToAdd = "";
                var baseFieldsToAdd = "";
    
                _AllPlayers.map((otherPlayer) => {
                    if( otherPlayer.tag != _Player.tag && otherPlayer.location == _Player.location)
                    {
                        arrPlayers.push(otherPlayer.tag);
                    }
                    
                    if( otherPlayer.base.location == _Player.location)
                    {
                        arrBases.push(otherPlayer.base.id);
                    }      
                });

                if(arrPlayers.length > 0)
                {
                    arrPlayers.sort();

                    arrPlayers.forEach(player =>{
                        playerFieldsToAdd += "- " + player + "\n";
                    });
                    
                    embedded.addFields(
                        { name: 'Other players near you:', value: playerFieldsToAdd },
                    );
                }
                else
                {
                    embedded.addFields(
                        { name: 'Other players near you:', value: '*-NONE-*' },
                    );
                }

                if(arrBases.length > 0)
                {
                    arrBases.sort();

                    arrBases.forEach(base =>{
                        baseFieldsToAdd += "- " + base + "\n";
                    });

                    embedded.addFields(
                        { name: 'Bases near you:', value: baseFieldsToAdd },
                    );
                }
                else
                {
                    embedded.addFields(
                        { name: 'Bases near you:', value: '*-NONE-*' },
                    );
                }

                console.log("[LOCATION] Displaying surrounding.");

                return message.channel.send(embedded);
            });
        }
    }
}