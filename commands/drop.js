const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
    name: 'drop',
    description: 'Drop an item from your inventory.',
    args: true,
    usage: '<inventory_item_number>',
    execute(client, message, args, _Player,){

        var embedded = new Discord.MessageEmbed();
            embedded.setAuthor(message.member.user.tag, message.member.user.avatarURL());

        var id = parseInt(args[0]);

        if( isNaN(id) ) {
            
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
            embedded.setColor('#ff4f4f')
                .setDescription('That number doesn\'t exist in your inventory list');

            return message.channel.send(embedded);
        }
        else
        {
            console.log(`[DROP] Dropped item **${_Player.inventory[id].name}** successfully`);

            _Player.inventory.splice(id,1);
            _Player.save();

            embedded.setColor('#78de87')
                .setDescription(`Dropped item successfully`);

            return message.channel.send(embedded);
        }

    }
}