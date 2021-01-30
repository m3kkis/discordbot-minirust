var config = {};

//CHARACTER
config.MAX_INVENTORY = 5;

//RESOURCES
config.YIELD_ORE_HQM_CHANCE = 20;

//BASE
config.BASE_MAX_SIZE = 6;
config.BASE_TYPES = ['twig','wood','stone','metal','armored'];
config.BASE_UPGRADE_MATERIALS = ['wood','wood','stone','metal_fragments','hqm'];
config.BASE_UPGRADE_MATERIALS_COST = [260,1300,1560,1040,131];

//LOOTING
config.LOOT_MAX_ITEMS = 4;
config.LOOT_CHANCE_RATION = 10;
config.LOOT_CHANCE_CRATE = 40;
config.SCRAP_MAX_CRATE = 5;
config.LOOT_CHANCE_BARREL = 80;
config.SCRAP_MAX_BARREL = 2;



module.exports = config;