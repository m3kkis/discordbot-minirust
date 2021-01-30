const Discord = require("discord.js");
const jsonLocations = require('../json/locations.json');

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
            var replyTextFrom;
            var replyTextLoot = "*-NOTHING-*";

            if(jsonLocations[idx].loot_tier == 0)
            {

                if(chance <= config.LOOT_CHANCE_RATION)
                {
                    replyTextFrom = "You got some loot from a **RATION CRATE**";
                    replyTextLoot = "";
                    var nbrLoot = Math.floor(Math.random() * config.LOOT_MAX_ITEMS + 1);

                    if(nbrLoot > 0)
                    {
                        for(var i = 0; i < nbrLoot; i++)
                        {
                            if(_Player.inventory.length < config.MAX_INVENTORY)
                            {
                                let itemsReceived = Utils.giveRandomLootItem(_Player, "ration");
                                console.log(itemsReceived.quantity);
                                replyTextLoot += "- _" + itemsReceived.name + " (" + itemsReceived.quantity + ")_\n";
                            }
                        }
                    }
                }
                else if(chance <= config.LOOT_CHANCE_CRATE)
                {
                    replyTextFrom = "You got some loot from a **CRATE**";
                    replyTextLoot = "- _Scrap (" + config.SCRAP_MAX_CRATE + ")_\n";

                    Utils.giveScrap(_Player, config.SCRAP_MAX_CRATE, false)

                    var nbrLoot = Math.floor(Math.random() * config.LOOT_MAX_ITEMS);

                    if(nbrLoot > 0)
                    {
                        for(var i = 0; i < nbrLoot; i++)
                        {
                            if(_Player.inventory.length < config.MAX_INVENTORY)
                            {
                                let itemsReceived = Utils.giveRandomLootItem(_Player, "crate");
                                console.log(itemsReceived.quantity);
                                replyTextLoot += "- _" + itemsReceived.name + " (" + itemsReceived.quantity + ")_\n";
                            }
                        }
                    }
                }
                else if(chance <= config.LOOT_CHANCE_BARREL)
                {
                    replyTextFrom = "You got some loot from a **BARREL**";
                    replyTextLoot = "- _Scrap (" + config.SCRAP_MAX_BARREL + ")_\n";

                    Utils.giveScrap(_Player, config.SCRAP_MAX_BARREL, false)

                    var nbrLoot = Math.floor(Math.random() * config.LOOT_MAX_ITEMS);

                    if(nbrLoot > 0)
                    {
                        for(var i = 0; i < nbrLoot; i++)
                        {
                            if(_Player.inventory.length < config.MAX_INVENTORY)
                            {
                                let itemsReceived = Utils.giveRandomLootItem(_Player,"barrel");
                                console.log(itemsReceived.quantity);
                                replyTextLoot += "- _" + itemsReceived.name + " (" + itemsReceived.quantity + ")_\n";
                            }
                        }
                    }
                }
                else
                {
                    replyTextFrom = "You didn't find anything to loot";
                }

            }
            else if(jsonLocations[idx].loot_tier == 1)
            {

            }
            else if(jsonLocations[idx].loot_tier == 2)
            {

            }

            _Player.markModified('inventory');
            _Player.save();

            console.log("[LOOT] Looting success.");
            embedded.setColor('#78de87')
                .setDescription(replyTextFrom)
                .addField('You received',replyTextLoot,false)
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