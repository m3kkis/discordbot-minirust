const Discord = require("discord.js");
const jsonLocation = require('../json/locations.json')
const Utils = require("../lib/utils");
const Players = require('../models/player');

const config = require('../config');

module.exports = {
    name: 'base',
    description: 'View base info, used to build initial base with <build>',
    args: false,
    usage: '<optional:build>',
    execute(client, message, args, _Player){

        var embedded = new Discord.MessageEmbed();
        embedded.setAuthor(message.member.user.tag, message.member.user.avatarURL());

        if(args[0] != undefined && args[0].toLowerCase() == "build")
        {

            let idx = jsonLocation.findIndex(x => x.id === _Player.location);

            if(jsonLocation[idx].canBuild == true)
            {
                if(_Player.base.id == undefined)
                {
                    Players.find({"base.location" : _Player.location}).then( _Players => {
    
                        if(_Players.length >= 2)
                        {
                            console.log("[BASE] Maximum location bases reached.");
    
                            embedded.setColor('#ff4f4f')
                                    .setDescription(`Can't build here. Max 2 bases per location.`)
                            return message.channel.send(embedded);
                        }
                        else
                        {
                            console.log("[BASE] Building a base.");
    
                            _Player.base.id = "B" + Utils.generateID(4);
                            _Player.base.location = _Player.location;
                            _Player.base.tier = 0;
                            _Player.base.size = 1;
                            _Player.base.space_used = 0;
                            _Player.base.sleeping_bag = 0;
                            _Player.base.workbench = 0;
                            _Player.base.research_table = 0;
                            _Player.base.storage = 0;
                            _Player.base.furnace = 0;
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
                console.log("[BASE] Cannot build base at this location.");
    
                embedded.setColor('#ff4f4f')
                        .setDescription(`Cannot build base at this location.`)
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
                    **Structure:** *${config.BASE_TYPES[_Player.base.tier]}*
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