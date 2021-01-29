var config = {};

//CHARACTER
config.MAX_INVENTORY = 5;

//RESOURCES
config.YIELD_WOOD = 1;
config.YIELD_STONE = 1;
config.YIELD_ORE_SULFUR = 1;
config.YIELD_ORE_METAL = 1;
config.YIELD_ORE_HQM = 1;
config.YIELD_ORE_HQM_CHANCE = 20;

//BASE
config.BASE_MAX_SIZE = 6;
config.BASE_TYPES = ['twig','wood','stone','metal','armored'];
config.BASE_UPGRADE_MATERIALS = ['wood','wood','stone','metal_fragments.','hqm'];
config.BASE_UPGRADE_MATERIALS_COST = [260,1300,1560,1040,131];

module.exports = config;