const Discord = require("discord.js");
const jsonLocations = require('../json/locations.json');
const jsonLoot = require('../json/loot_table.json');
const Utils = require("../lib/utils");
const config = require('../config');

module.exports = {
    name: 'loot',
    description: 'Scavange some loot in your location',
    args: false,
    usage: '<optional:list>',
    execute(client, message, args, _Player){

        var embedded = new Discord.MessageEmbed();
        embedded.setColor('#03b6fc')
                .setAuthor(message.member.user.tag, message.member.user.avatarURL());
        
        //check inventory sapce
        if(_Player.inventory.length >= config.MAX_INVENTORY)
        {
            console.log("[LOOT] Not enough inventory space.");
            embedded.setColor('#ff4f4f')
                .setDescription(`Your inventory is full.`)
                .setFooter(`___\nType "${process.env.BOT_PREFIX}inv" to view your inventory.`);
            return message.channel.send(embedded);
        }

        var idx = jsonLocations.findIndex(x => x.id === _Player.location);
        
        if(idx >= 0 )
        {

            var chance = Math.floor(Math.random() * 100);

            if(jsonLocations[idx].loot_tier == 0)
            {

                if(chance <= 20)
                {
                    console.log("1");
                }
                else if(chance <= 40)
                {
                    console.log("2");

                    Utils.giveScrap(_Player, jsonLoot[jsonLocations[idx].loot_tier][1].scrap, true);
                    giveLootItems(config.LOOT_MAX_ITEMS);

                }
                else if(chance <= 80){
                    console.log("3");

                    Utils.giveScrap(_Player, jsonLoot[jsonLocations[idx].loot_tier][2].scrap, true)

                }
                else
                {
                    console.log("4");
                }

            }
            else if(jsonLocations[idx].loot_tier == 1)
            {

            }
            else if(jsonLocations[idx].loot_tier == 2)
            {

            }

            console.log("[LOOT] Looting success.");
            embedded.setColor('#78de87')
                .setDescription(`You successfully looted.`)
                .addField('You received','*-NOTHING-*',false)
            return message.channel.send(embedded);
        }
        else
        {
            console.log("[LOOT] Can't loot here.");
            embedded.setColor('#ff4f4f')
                .setDescription(`You can't loot this location.`)
                .setFooter(`___\nType "${process.env.BOT_PREFIX}map" to view the map.`);
            return message.channel.send(embedded);
        }


    }
}