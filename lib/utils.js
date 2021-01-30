const jsonResources = require('../json/resources.json');
const jsonLootBarrel = require('../json/loot_barrel.json');
const jsonLootCrate = require('../json/loot_crate.json');
const jsonLootRation = require('../json/loot_ration.json');

const config = require('../config');

module.exports = {
    generateID: length => {
        var result = '';
        var characters = '0123456789'; // removed for now AABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    },
    giveResources: (_Player, resource) => {

        var idx = _Player.inventory.findIndex(x => x.id === resource);

        if(resource == "ore_sulfur")
        {
            if(idx >= 0)
            {
                _Player.inventory[idx].quantity += jsonResources.resources[0].quantity;
            }
            else
            {
                _Player.inventory.push(jsonResources.resources[0])
            }
        }
        else if(resource == "wood")
        {
            if(idx >= 0)
            {
                _Player.inventory[idx].quantity += jsonResources.resources[1].quantity;
            }
            else
            {
                _Player.inventory.push(jsonResources.resources[1])
            }
        }
        else if(resource == "ore_metal")
        {
            if(idx >= 0)
            {
                _Player.inventory[idx].quantity += jsonResources.resources[2].quantity;
            }
            else
            {
                _Player.inventory.push(jsonResources.resources[2])
            }
        }
        else if(resource == "ore_hqm")
        {
            if(idx >= 0)
            {
                _Player.inventory[idx].quantity += jsonResources.resources[3].quantity;
            }
            else
            {
                _Player.inventory.push(jsonResources.resources[3])
            }
        }
        else if(resource == "stone")
        {
            if(idx >= 0)
            {
                _Player.inventory[idx].quantity += jsonResources.resources[4].quantity;
            }
            else
            {
                _Player.inventory.push(jsonResources.resources[4])
            }
        }
    },
    giveScrap: (_Player, amountScrap, random) => {

        //Need to make sure you have a .save() after this function.
        
        var idx = _Player.inventory.findIndex(x => x.id === "scrap");
        var nbrScrap;

        if(random == true)
        {
            nbrScrap = Math.floor(Math.random() * amountScrap) + 1;
        }
        else
        {
            nbrScrap = amountScrap;
        }
        
        if(idx >= 0)
        {
            _Player.inventory[idx].quantity += nbrScrap;
        }
        else
        {
            let itemScrap = {
                id : "scrap",
                name : "Scrap",
                description: "Used as currency or for crafting.",
                type: "item",
                quantity : nbrScrap
            }
            _Player.inventory.push(itemScrap)
        }
    },
    giveRandomLootItem: (_Player, container)=>{

        if(container == "barrel")
        {
            let randomNbr = Math.floor(Math.random() * jsonLootBarrel.items.length);
            
            var idx = _Player.inventory.findIndex(x => x.id === jsonLootBarrel.items[randomNbr].id);

            if(idx >= 0 && jsonLootBarrel.items[randomNbr].stackable == true)
            {
                _Player.inventory[idx].quantity += jsonLootRation.items[randomNbr].quantity;;
            }
            else
            {
                _Player.inventory.push(jsonLootBarrel.items[randomNbr])
            }

            return {name: jsonLootBarrel.items[randomNbr].name, quantity: jsonLootRation.items[randomNbr].quantity};
        }
        else if(container == "crate")
        {
            let randomNbr = Math.floor(Math.random() * jsonLootCrate.items.length);

            var idx = _Player.inventory.findIndex(x => x.id === jsonLootCrate.items[randomNbr].id);

            if(idx >= 0 && jsonLootCrate.items[randomNbr].stackable == true)
            {
                _Player.inventory[idx].quantity += jsonLootRation.items[randomNbr].quantity;
            }
            else
            {
                _Player.inventory.push(jsonLootCrate.items[randomNbr])
            }

            return {name: jsonLootCrate.items[randomNbr].name, quantity: jsonLootRation.items[randomNbr].quantity};
        }
        else if(container == "ration")
        {
            let randomNbr = Math.floor(Math.random() * jsonLootRation.items.length);

            var idx = _Player.inventory.findIndex(x => x.id === jsonLootRation.items[randomNbr].id);

            if(idx >= 0 && jsonLootRation.items[randomNbr].stackable == true)
            {
                _Player.inventory[idx].quantity += jsonLootRation.items[randomNbr].quantity;
            }
            else
            {
                _Player.inventory.push(jsonLootRation.items[randomNbr])
            }

            return {name: jsonLootRation.items[randomNbr].name, quantity: jsonLootRation.items[randomNbr].quantity};
        }

    }
};