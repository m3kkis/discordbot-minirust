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

config.BASE_UPGRADE_SLEEP_COST = 30;
config.BASE_UPGRADE_STORAGE_COST = [10,100,200] // cloth, wood, metal_frag
config.BASE_UPGRADE_RESEARCH_COST = [200,20]; // metal_frag , scrap
config.BASE_UPGRADE_FURNACE_COST = [200,100,50]; // stone , wood, low grade fuel
config.BASE_UPGRADE_WORKBENCH_COST = [
    [500,100,50],       // wood , metal_framgments, scrap
    [500,20,500],       // metal frag, hqm, scrap
    [1000,100,1250],    // metal_fragments,hqm,scrap
]; 


//LOOTING
config.LOOT_MAX_ITEMS = 4;
config.LOOT_CHANCE_RATION = 10;
config.LOOT_CHANCE_CRATE = 40;
config.SCRAP_MAX_CRATE = 5;
config.LOOT_CHANCE_BARREL = 80;
config.SCRAP_MAX_BARREL = 2;



module.exports = config;