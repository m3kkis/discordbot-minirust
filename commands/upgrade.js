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

                    if(_Player.inventory[idx].quantity <= 0)
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

                    if(_Player.base.tier >= 2)
                    {

                        var idx = _Player.inventory.findIndex(x => x.id === config.BASE_UPGRADE_MATERIALS[_Player.base.tier]);
                        var cost = config.BASE_UPGRADE_MATERIALS_COST[_Player.base.tier];

                        var idxWood = _Player.inventory.findIndex(x => x.id === config.BASE_UPGRADE_MATERIALS[0]);
                        var costWood = config.BASE_UPGRADE_MATERIALS_COST[0];
                        
                        if(idx < 0 || idxWood < 0)
                        {
                            console.log("[UPGRADE] resource not found");
                            embedded.setColor('#ff4f4f')
                                .setDescription('You are missing the resources in your inventory to upgrade.')
                                .setFooter(`___\nType "${process.env.BOT_PREFIX}inv" to check your inventory.`);
                            return message.channel.send(embedded);
                        }

                        if(_Player.inventory[idx].quantity < cost && _Player.inventory[idxWood].quantity < costWood )
                        {
                            console.log("[UPGRADE] not enough resource quantity");
                            embedded.setColor('#ff4f4f')
                                .setDescription('You do not have enough resources to upgrade.')
                                .setFooter(`___\nType "${process.env.BOT_PREFIX}upgrade" to view base upgrades costs.`);
                            return message.channel.send(embedded);
                        }

                        _Player.inventory[idx].quantity -= cost;
                        _Player.inventory[idxWood].quantity -= costWood;

                        if(_Player.inventory[idx].quantity <= 0 && _Player.inventory[idxWood].quantity <= 0)
                        {
                            if(idx > idxWood)
                            {
                                _Player.inventory.splice(idx,1);
                                _Player.inventory.splice(idxWood,1);
                            }
                            else if(idxWood > idx)
                            {
                                _Player.inventory.splice(idxWood,1);
                                _Player.inventory.splice(idx,1);
                            }
                        }
                        else if(_Player.inventory[idx].quantity <= 0)
                        {
                            _Player.inventory.splice(idx,1);
                        }
                        else if(_Player.inventory[idxWood].quantity <= 0)
                        {
                            _Player.inventory.splice(idxWood,1);
                        }

                        _Player.base.size++;
                        _Player.markModified('inventory');
                        _Player.save();

                        embedded.setColor('#78de87')
                            .setDescription(`You successfully upgraded your base.`)

                        return message.channel.send(embedded);

                    }
                    else
                    {
                        var idx = _Player.inventory.findIndex(x => x.id === config.BASE_UPGRADE_MATERIALS[_Player.base.tier]);
                        var cost = config.BASE_UPGRADE_MATERIALS_COST[_Player.base.tier];
                        
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

                        if(_Player.inventory[idx].quantity <= 0)
                        {
                            _Player.inventory.splice(idx,1);
                        }

                        _Player.base.size++;
                        _Player.save();

                        embedded.setColor('#78de87')
                            .setDescription(`You successfully upgraded your base.`)

                        return message.channel.send(embedded);
                    }
                    
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
            else if(args[0] == "3")
            {

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

            
            var baseTier;       //base tier
            var baseSize;       //base size
            var baseSleep;      //sleeping bag aka spawn point
            var spacer;         //space between 
            var baseWorkbench;  //workbench
            var baseResearch;   //research table
            var baseChest;      //chest
            var baseFurnace;      //chest

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

            //SPACER
            spacer = `**INTERIOR UPGRADES ( ${_Player.base.space_used} / ${_Player.base.size})**`;


            //sleepingbag - spawn point
            if( _Player.base.sleeping_bag == 1 )
            {
                baseSleep = `**3.** ~~Sleeping Bag - ${_Player.base.sleeping_bag}/1~~ • \`MAXED OUT\``;
            }
            else
            {
                baseSleep = `**3.** Sleeping Bag - 0/1 • \`Costs: ${config.BASE_UPGRADE_SLEEP_COST} cloth\``;
            }
            

            //workbench
            if( _Player.base.workbench == 3 )
            {
                baseWorkbench = `**4.** ~~Workbench LVL - ${_Player.base.workbench}/3~~ • \`MAXED OUT\``;
            }
            else if( _Player.base.workbench == 0 )
            {
                baseWorkbench = `**4.** Workbench LVL - ${_Player.base.workbench}/3 • \`Costs: ${config.BASE_UPGRADE_WORKBENCH_COST[_Player.base.workbench][0]} wood ${config.BASE_UPGRADE_WORKBENCH_COST[_Player.base.workbench][1]} metal_fragments ${config.BASE_UPGRADE_WORKBENCH_COST[_Player.base.workbench][2]} scrap\``;
            }
            else if( _Player.base.workbench == 1 )
            {
                baseWorkbench = `**4.** Workbench LVL - ${_Player.base.workbench}/3 • \`Costs: ${config.BASE_UPGRADE_WORKBENCH_COST[_Player.base.workbench][0]} metal_fragments ${config.BASE_UPGRADE_WORKBENCH_COST[_Player.base.workbench][1]} hqm ${config.BASE_UPGRADE_WORKBENCH_COST[_Player.base.workbench][2]} scrap\``;
            }
            else if( _Player.base.workbench == 2 )
            {
                baseWorkbench = `**4.** Workbench LVL - ${_Player.base.workbench}/3 • \`Costs: ${config.BASE_UPGRADE_WORKBENCH_COST[_Player.base.workbench][0]} metal_fragments ${config.BASE_UPGRADE_WORKBENCH_COST[_Player.base.workbench][1]} hqm ${config.BASE_UPGRADE_WORKBENCH_COST[_Player.base.workbench][2]} scrap\``;
            }

            //research table
            if( _Player.base.research_table == 1 )
            {
                baseResearch = `**5.** ~~Research Table - ${_Player.base.research_table}/1~~ • \`MAXED OUT\``;
            }
            else
            {
                baseResearch = `**5.**Research Table (req. Workbench) - ${_Player.base.research_table}/1 • \`Costs: ${config.BASE_UPGRADE_RESEARCH_COST[0]} metal_fragments ${config.BASE_UPGRADE_RESEARCH_COST[0]} scrap\``;
            }

            //storage
            if( _Player.base.storage == 3 )
            {
                baseStorage = `**6.** ~~Storage LVL - ${_Player.base.storage}/3~~ • \`MAXED OUT\``;
            }
            else if( _Player.base.storage == 0 )
            {
                baseStorage = `**6.** Storage LVL - ${_Player.base.storage}/3 • \`Costs: ${config.BASE_UPGRADE_STORAGE_COST[_Player.base.storage]} cloth\``;
            }
            else if( _Player.base.storage == 1 )
            {
                baseStorage = `**6.** Storage LVL - ${_Player.base.storage}/3 • \`Costs: ${config.BASE_UPGRADE_STORAGE_COST[_Player.base.storage]} wood\``;
            }
            else if( _Player.base.storage == 2 )
            {
                baseStorage = `**6.** Storage LVL - ${_Player.base.storage}/3 • \`Costs: ${config.BASE_UPGRADE_STORAGE_COST[_Player.base.storage]} metal_fragments\``;
            }

            //furnace
            if( _Player.base.furnace == 1 )
            {
                baseFurnace = `**7.** ~~Furnace - ${_Player.base.furnace}/1~~ • \`MAXED OUT\``;
            }
            else
            {
                baseFurnace = `**7.**Furnace - ${_Player.base.furnace}/1 • \`Costs: ${config.BASE_UPGRADE_FURNACE_COST[0]} stone ${config.BASE_UPGRADE_FURNACE_COST[1]} wood ${config.BASE_UPGRADE_FURNACE_COST[2]} low_grade_fuel\``;
            }


            var upgradeList = `
                ${baseTier}
                ${baseSize}

                ${spacer}
                ${baseSleep}
                ${baseWorkbench}
                ${baseResearch}
                ${baseStorage}
                ${baseFurnace}
            `;

            embedded.setDescription(`Upgrade your base by doing \`${process.env.BOT_PREFIX}upgrade <number>\`\nMust have the materials in your inventory.`)
                    .addField('EXTERIOR UPGRADES', upgradeList, true)
                    .setFooter(`___\nIf you need more space for interior upgrades, upgrade your base size.`);
            return message.channel.send(embedded);
        }
    }
}