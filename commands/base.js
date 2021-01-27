const Discord = require("discord.js");
const jsonLocation = require('../json/locations.json')
const Players = require('../models/player'); 

module.exports = {
    name: 'base',
    description: 'View your base info, also used to build initial base at current location using <build>',
    args: false,
    usage: '<optional:build>',
    execute(client, message, args, _Player){

        var embedded = new Discord.MessageEmbed();
        embedded.setAuthor(message.member.user.tag, message.member.user.avatarURL());

        if(args[0] != undefined && args[0].toLowerCase() == "build")
        {
            if(_Player.base.id == undefined)
            {
                Players.find({"base.location" : _Player.location}).then( _Players => {

                    if(_Players.length >= 2)
                    {
                        console.log("[BASE] Maximum locaiton bases reached.");

                        embedded.setColor('#ff4f4f')
                                .setDescription(`Can't build here. Max 2 bases per location.`)
                        return message.channel.send(embedded);
                    }
                    else
                    {
                        console.log("[BASE] Building a base.");

                        var baseName = "B1";

                        if(_Players[0] != undefined && _Players[0].base.id == "B1"){
                            baseName = "B2";
                        };
                         
                        _Player.base.id = baseName;
                        _Player.base.location = _Player.location;
                        _Player.base.type = "twig";
                        _Player.base.health_current = 10;
                        _Player.base.health = 10;
                        _Player.save();
        
                        embedded.setColor('#78de87')
                                .setDescription(`Successfully built a base.`)
        
                        return message.channel.send(embedded);
                    }
    
                });
            }
            else
            {
                console.log("[BASE] Already has a base.");

                embedded.setColor('#ff4f4f')
                        .setDescription(`You already have a base.`)
                return message.channel.send(embedded);
            }
        }
        else
        {
            if(_Player.base.id != undefined)
            {
                console.log("[BASE] Display base info.");

                var embText = `
                    **ID:** *${_Player.base.id}*
                    **Location:** *${_Player.base.location}*
                    **Type:** *${_Player.base.type}*
                    **Health:** *${_Player.base.health_current}/${_Player.base.health}*
                `;

                embedded.setColor('#78de87')
                        .setDescription(embText)

                return message.channel.send(embedded);
            }
            else
            {
                console.log("[BASE] Doesnt have a base.");

                embedded.setColor('#ff4f4f')
                        .setDescription(`You don't have a base.`)
                        .setFooter(`___\nType "${process.env.BOT_PREFIX}base build" to build a base at the current location.`);
                return message.channel.send(embedded);
            }

        }
    }
}