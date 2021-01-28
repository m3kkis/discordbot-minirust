const Discord = require("discord.js");

const config = require('../config');

module.exports = {
    name: 'collect',
    description: 'Collect resource.',
    args: false,
    execute(client, message, args, _Player){

        //NEED TO FIX INVENOTRY FOR METAL AND HQM

        var embedded = new Discord.MessageEmbed();
        embedded.setAuthor(message.member.user.tag, message.member.user.avatarURL())
        
        //check location
        if(_Player.location != "desert" && _Player.location != "forest" && _Player.location != "cave" && _Player.location != "mountain")
        {
            console.log("[COLLECT] Not in a resource location");
            embedded.setColor('#ff4f4f')
                .setDescription(`Must be at a resource location to collect wood, stone, metal or sulfur.`)
                .setFooter(`___\nType "${process.env.BOT_PREFIX}map" to view resource locations.`);
            return message.channel.send(embedded);
        }
        
        //check proper tool
        if(_Player.equipment.weapon[0].id != "rock" && _Player.equipment.weapon[0].id != "stone_axe" && _Player.equipment.weapon[0].id != "stone_pickaxe" && _Player.equipment.weapon[0].id != "hachet" && _Player.equipment.weapon[0].id != "pickaxe")
        {
            console.log("[COLLECT] No tool equipped");
            embedded.setColor('#ff4f4f')
                .setDescription(`Must equip a tool to collect resource.`)
                .setFooter(`___\nType "${process.env.BOT_PREFIX}equip <#id>" to equip a tool.`);
            return message.channel.send(embedded);
        }

        //check inventory sapce
        if(_Player.inventory.length >= config.MAX_INVENTORY)
        {
            console.log("[COLLECT] Not enough inventory space.");
            embedded.setColor('#ff4f4f')
                .setDescription(`You do not have enough space in your inventory.`)
                .setFooter(`___\nType "${process.env.BOT_PREFIX}inv" to view your inventory.`);
            return message.channel.send(embedded);
        }



        if(_Player.location == "desert")
        {
            var idx = _Player.inventory.findIndex(x => x.id === "ore_sulfur");

            if(idx > -1)
            {
                _Player.inventory[idx].quantity += config.YIELD_ORE_SULFUR;
                _Player.markModified('inventory');
            }
            else
            {
                let ore_sulfur = {
                    id : "ore_sulfur",
                    name : "Sulfur Ore",
                    description: "Smelts into sulfur",
                    quantity : config.YIELD_ORE_SULFUR
                };
    
                _Player.inventory.push(ore_sulfur)
            }
            
            _Player.save();
            
        }
        else if(_Player.location == "forest")
        {

            var idx = _Player.inventory.findIndex(x => x.id === "wood");

            if(idx > -1)
            {
                _Player.inventory[idx].quantity += config.YIELD_WOOD;
                _Player.markModified('inventory');
            }
            else
            {
                let wood = {
                    id : "wood",
                    name : "Wood",
                    description: "Used for crafting/upgrading.",
                    quantity : config.YIELD_WOOD
                };
    
                _Player.inventory.push(wood)
            }
            
            _Player.save();

        }
        else if(_Player.location == "cave")
        {

            var idxMetal = _Player.inventory.findIndex(x => x.id === "ore_metal");
            var idxHQM = _Player.inventory.findIndex(x => x.id === "ore_hqm");

            var chance = Math.floor(Math.random() * 100);

            if(idxMetal > -1)
            {
                _Player.inventory[idxMetal].quantity += config.YIELD_ORE_METAL;
                _Player.markModified('inventory');
            }
            else
            {
                let ore_metal = {
                    id : "ore_metal",
                    name : "Metal Ore",
                    description: "Smelts into metal fragments.",
                    quantity : config.YIELD_ORE_METAL
                };
    
                _Player.inventory.push(ore_metal)
            }

            if(chance <= config.YIELD_ORE_HQM_CHANCE)
            {
                if(idxHQM > -1)
                {
                    _Player.inventory[idxHQM].quantity += config.YIELD_ORE_HQM;
                    _Player.markModified('inventory');
                }
                else
                {
                    let ore_hqm = {
                        id : "ore_hqm",
                        name : "HQM Ore",
                        description: "Smelts into HQM.",
                        quantity : config.YIELD_ORE_HQM
                    };
        
                    _Player.inventory.push(ore_hqm)
                }
            }

            

            _Player.save();

        }
        else if(_Player.location == "mountain")
        {

            var idx = _Player.inventory.findIndex(x => x.id === "stone");

            if(idx > -1)
            {
                _Player.inventory[idx].quantity += config.YIELD_STONE;
                _Player.markModified('inventory');
            }
            else
            {
                let stone = {
                    id : "stone",
                    name : "Stone",
                    description: "Used for crafting/upgrading.",
                    quantity : config.YIELD_STONE
                };
    
                _Player.inventory.push(stone)
            }
            
            _Player.save();

        }

        embedded.setColor('#78de87')
                .setDescription(`You've successfully collected resource.`)
                .setFooter(`___\nType "${process.env.BOT_PREFIX}inv" to view your inventory.`);

        return message.channel.send(embedded);
    }
}