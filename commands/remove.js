const Discord = require("discord.js");
const jsonLocations = require('../json/locations.json')

const config = require('../config');

module.exports = {
    name: 'remove',
    description: 'Remove weapon or armor.',
    args: true,
    usage: '<weapon or armor>',
    aliases: ['rem'],
    execute(client, message, args, _Player){

        var embedded = new Discord.MessageEmbed();
            embedded.setAuthor(message.member.user.tag, message.member.user.avatarURL());

        var itemType = args[0].toLowerCase();

        if(itemType == "weapon")
        {
            if(_Player.equipment.weapon.length > 0)
            {
                if(_Player.inventory.length < config.MAX_INVENTORY)
                {
                    var removedItem =_Player.equipment.weapon.splice(0);
                    _Player.inventory.push(removedItem[0]);
                    _Player.save();

                    embedded.setColor('#78de87')
                        .setDescription(`You removed your weapon.`)

                    return message.channel.send(embedded);
                }
                else
                {
                    embedded.setColor('#ff4f4f')
                        .setDescription(`You dont have space in your inventory.`)
                        .setFooter(`___\nType "${process.env.BOT_PREFIX}inv" to check your inventory.`);

                    return message.channel.send(embedded);
                }
            }
            else
            {
                embedded.setColor('#ff4f4f')
                    .setDescription(`You are not equipped with any weapons.`)
                    .setFooter(`___\nType "${process.env.BOT_PREFIX}inv" to know what you have equipped.`);

                return message.channel.send(embedded);
            }
        }
        else if(itemType == "armor")
        {
            if(_Player.equipment.armor.length > 0)
            {
                if(_Player.inventory.length < config.MAX_INVENTORY)
                {
                    var removedItem =_Player.equipment.armor.splice(0);
                    _Player.inventory.push(removedItem[0]);
                    _Player.save();

                    embedded.setColor('#78de87')
                        .setDescription(`You removed your armor.`)

                    return message.channel.send(embedded);
                }
                else
                {
                    embedded.setColor('#ff4f4f')
                        .setDescription(`You dont have space in your inventory.`)
                        .setFooter(`___\nType "${process.env.BOT_PREFIX}inv" to check your inventory.`);

                    return message.channel.send(embedded);
                }
            }
            else
            {
                embedded.setColor('#ff4f4f')
                    .setDescription(`You are not equipped with any armor.`)
                    .setFooter(`___\nType "${process.env.BOT_PREFIX}inv" to know what you have equipped.`);

                return message.channel.send(embedded);
            }
        }
        else
        {
            embedded.setColor('#ff4f4f')
                .setDescription(`Check if you type weapon or armor correctly, you can only remove those.`)
                .setFooter(`___\nType "${process.env.BOT_PREFIX}inv" to know what you have equipped.`);

            return message.channel.send(embedded);
        }
        
    }
}