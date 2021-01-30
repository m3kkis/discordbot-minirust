const Discord = require("discord.js");

const Utils = require("../lib/utils");
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
                .setFooter(`___\nType "${process.env.BOT_PREFIX}use <#id>" to equip a tool.`);
            return message.channel.send(embedded);
        }

        //check inventory sapce
        if(_Player.inventory.length >= config.MAX_INVENTORY)
        {
            console.log("[COLLECT] Not enough inventory space.");
            embedded.setColor('#ff4f4f')
                .setDescription(`Your inventory is full.`)
                .setFooter(`___\nType "${process.env.BOT_PREFIX}inv" to view your inventory.`);
            return message.channel.send(embedded);
        }



        if(_Player.location == "desert")
        {
            Utils.giveResources(_Player, "ore_sulfur")
            _Player.markModified('inventory');
            _Player.save();
        }
        else if(_Player.location == "forest")
        {

            Utils.giveResources(_Player, "wood")
            _Player.markModified('inventory');
            _Player.save();

        }
        else if(_Player.location == "cave")
        {

            var chance = Math.floor(Math.random() * 100);

            Utils.giveResources(_Player, "ore_metal")

            if(chance <= config.YIELD_ORE_HQM_CHANCE)
            {
                Utils.giveResources(_Player, "ore_hqm")
            }

            _Player.markModified('inventory');
            _Player.save();

        }
        else if(_Player.location == "mountain")
        {

            Utils.giveResources(_Player, "stone")
            _Player.markModified('inventory');
            _Player.save();

        }
        
        console.log("[COLLECT] Collected resource.");

        embedded.setColor('#78de87')
                .setDescription(`You've successfully collected resource.`)
                .setFooter(`___\nType "${process.env.BOT_PREFIX}inv" to view your inventory.`);

        return message.channel.send(embedded);
    }
}