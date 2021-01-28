const Discord = require("discord.js");

module.exports = {
    name: 'use',
    description: 'Use/equip an item from your inventory.',
    args: true,
    usage: '<inventory_item_number>',
    execute(client, message, args, _Player,){

        var embedded = new Discord.MessageEmbed();
            embedded.setAuthor(message.member.user.tag, message.member.user.avatarURL());

        var id = parseInt(args[0]);

        if( isNaN(id) ) {
            console.log("[USE] NaN.");
            embedded.setColor('#ff4f4f')
                .setDescription('That doesn\'t seem to be a valid NUMBER.');

            return message.channel.send(embedded);
        }
        else
        {
            id--;
        }

        if(_Player.inventory[id] == undefined)
        {
            console.log("[USE] Inventory item doesnt exist.");
            embedded.setColor('#ff4f4f')
                .setDescription('That number doesn\'t exist in your inventory list')
                .setFooter(`___\nType "${process.env.BOT_PREFIX}inv" to check inventory.`);

            return message.channel.send(embedded);
        }
        else
        {

            if(_Player.inventory[id].type == "weapon")
            {
                if(_Player.equipment.weapon.length > 0)
                {
                    var invItem =_Player.inventory.splice(id);
                    var equippedItem =_Player.equipment.weapon.splice(0);

                    _Player.inventory.push(equippedItem[0]);
                    _Player.equipment.weapon.push(invItem[0]);
                }
                else
                {
                    var invItem =_Player.inventory.splice(id);
                    _Player.equipment.weapon.push(invItem[0]);
                }

                _Player.save();

                console.log("[USE] Equip weapon.");

                embedded.setColor('#78de87')
                    .setDescription(`You successfully equipped an item.`)

                return message.channel.send(embedded);
            }
            else
            {
                console.log("[USE] Cannot use this item.");

                embedded.setColor('#ff4f4f')
                    .setDescription('Cannot use or equip this item.')
                    .setFooter(`___\nType "${process.env.BOT_PREFIX}inv" to check inventory.`);

                return message.channel.send(embedded);
            }

        }

    }
}