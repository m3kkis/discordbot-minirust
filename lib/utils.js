const Players = require('../models/player'); 

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
    giveScrap: (_Player, amountScrap, random) => {

        //Need to make sure you have a .save() after this function.
        
        var idx = jsonLocations.findIndex(x => x.id === "scrap");
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

    }
};