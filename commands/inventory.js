const Discord = require("discord.js");

const config = require('../config');

module.exports = {
    name: 'inventory',
    description: 'Show your inventory.',
    args: false,
    usage: '',
    aliases: ['inv'],
    execute(client, message, args, _Player){

        var embedded = new Discord.MessageEmbed();
        embedded.setAuthor(message.member.user.tag, message.member.user.avatarURL())
                .setColor('#03b6fc')
        
        if(_Player.inventory != undefined && _Player.inventory.length > 0)
        {
            var reply = "";
            var usedInv = 0;
            _Player.inventory.map((item, idx) => {
                reply += `${idx+1}. **${item.name}** - *${item.description}*\n \`Quantity: ${item.quantity}\`\n`;
                usedInv++;
            });
            
            embedded.setDescription(`Inventory size: [ ${usedInv}/${config.MAX_INVENTORY}]`)
                .addField('Your Inventory',reply,true);

            return message.author.send(embedded);
        }
        else
        {
            embedded.setDescription(`Inventory size: [ 0/${config.MAX_INVENTORY}]`)
                .addField('Your Inventory','*- Empty -*',true);

            return message.author.send(embedded);
        }

    }
}