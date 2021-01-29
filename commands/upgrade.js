const Discord = require("discord.js");

const config = require('../config');

module.exports = {
    name: 'upgrade',
    description: 'Upgrade your base.',
    args: false,
    usage: '<optional:id>',
    execute(client, message, args, _Player){

        var embedded = new Discord.MessageEmbed();
        embedded.setColor('#03b6fc')
                .setAuthor(message.member.user.tag, message.member.user.avatarURL());

        if(_Player.location != "base")
        {
            console.log("[UPGRADE] Can only upgrade in base")
            embedded.setColor('#ff4f4f')
                .setDescription('You can only upgrade in your base.');
            return message.channel.send(embedded);
        }

        if(args[0] != undefined)
        {
            if(args[0] == "1")
            {
                if(_Player.base.tier < config.BASE_TYPES.length - 1)
                {

                    var idx = _Player.inventory.findIndex(x => x.id === config.BASE_UPGRADE_MATERIALS[_Player.base.tier + 1]);
                    var cost = config.BASE_UPGRADE_MATERIALS_COST[_Player.base.tier + 1] * _Player.base.size;

                    if(idx < 0)
                    {
                        console.log("[UPGRADE] resource not found");
                        embedded.setColor('#ff4f4f')
                            .setDescription('You are missing the resources in your inventory to upgrade.')
                            .setFooter(`___\nType "${process.env.BOT_PREFIX}inv" to check your inventory.`);
                        return message.channel.send(embedded);
                    }

                    if(_Player.inventory[idx].quantity < cost)
                    {
                        console.log("[UPGRADE] not enough resource quantity");
                        embedded.setColor('#ff4f4f')
                            .setDescription('You do not have enough resources to upgrade.')
                            .setFooter(`___\nType "${process.env.BOT_PREFIX}upgrade" to view base upgrades costs.`);
                        return message.channel.send(embedded);
                    }
                    

                    _Player.inventory[idx].quantity -= cost;

                    if(_Player.inventory[idx].quantity >= 0)
                    {
                        _Player.inventory.splice(idx,1);
                    }

                    _Player.base.tier++;
                    _Player.markModified('inventory');
                    _Player.save();

                    embedded.setColor('#78de87')
                        .setDescription(`You successfully upgraded your base.`)

                    return message.channel.send(embedded);
                }
                else
                {
                    console.log("[UPGRADE] Maxed out base tier");
                    embedded.setColor('#ff4f4f')
                        .setDescription('You have already maxed out the base foundation')
                        .setFooter(`___\nType "${process.env.BOT_PREFIX}base" to view base info.`);
                    return message.channel.send(embedded);
                }
            }
            else if(args[0] == "2")
            {
                if(_Player.base.size < config.BASE_MAX_SIZE)
                {
                    _Player.base.size++;
                    _Player.save();

                    embedded.setColor('#78de87')
                        .setDescription(`You successfully upgraded your base.`)

                    return message.channel.send(embedded);
                }
                else
                {
                    console.log("[UPGRADE] Maxed out base size");
                    embedded.setColor('#ff4f4f')
                        .setDescription('You have already maxed out the base size')
                        .setFooter(`___\nType "${process.env.BOT_PREFIX}base" to view base info.`);
                    return message.channel.send(embedded);
                }
            }
            else
            {
                console.log("[UPGRADE] Incorrect upgrade number")
                embedded.setColor('#ff4f4f')
                    .setDescription('Incorrect upgrade number.')
                    .setFooter(`___\nType "${process.env.BOT_PREFIX}upgrade" to view base upgrades.`);
                return message.channel.send(embedded);
            }
        }
        else
        {
            console.log("[UPGRADE] Displaying list of upgrades.")

            
            var baseTier; //base tier
            var baseSize; //base size

            //tier
            if( (_Player.base.tier + 1) >= config.BASE_TYPES.length)
            {
                baseTier = `**1.**  ~~Foundation - *${config.BASE_TYPES[_Player.base.tier]}*~~ • \`MAXED OUT\``;
            }
            else
            {
                baseTier = `**1.** Foundation - *from ${config.BASE_TYPES[_Player.base.tier]} to ${config.BASE_TYPES[_Player.base.tier + 1]}* • \`Costs: ${config.BASE_UPGRADE_MATERIALS_COST[_Player.base.tier + 1] * _Player.base.size} ${config.BASE_UPGRADE_MATERIALS[_Player.base.tier + 1]}\``
            }

            //size
            if(_Player.base.size >= config.BASE_MAX_SIZE)
            {
                baseSize = `**2.** ~~Size - *${_Player.base.size}/${config.BASE_MAX_SIZE}*~~ • \`MAXED OUT\``;
            }
            else
            {
                if(_Player.base.tier == 0)
                {
                    baseSize = `**2.** Size - ${_Player.base.size}/${config.BASE_MAX_SIZE} • \`Costs: ${config.BASE_UPGRADE_MATERIALS_COST[_Player.base.tier]} ${config.BASE_UPGRADE_MATERIALS[_Player.base.tier]}\``;
                }
                else if(_Player.base.tier == 1)
                {
                    baseSize = `**2.** Size - ${_Player.base.size}/${config.BASE_MAX_SIZE} • \`Costs: ${config.BASE_UPGRADE_MATERIALS_COST[_Player.base.tier] + config.BASE_UPGRADE_MATERIALS_COST[0]} ${config.BASE_UPGRADE_MATERIALS[_Player.base.tier]}\``;
                }
                else
                {
                    baseSize = `**2.** Size - ${_Player.base.size}/${config.BASE_MAX_SIZE} • \`Costs: ${config.BASE_UPGRADE_MATERIALS_COST[0]} ${config.BASE_UPGRADE_MATERIALS[0]} and ${config.BASE_UPGRADE_MATERIALS_COST[_Player.base.tier]} ${config.BASE_UPGRADE_MATERIALS[_Player.base.tier]}\``;
                }
            }

            var upgradeList = `
                ${baseTier}
                ${baseSize}
            `;

            embedded.setDescription(`Upgrade your base by doing \`${process.env.BOT_PREFIX}upgrade <number>\`\nMust have the materials in your inventory.`)
                    .addField('UPGRADES', upgradeList, true)
            return message.channel.send(embedded);
        }
    }
}