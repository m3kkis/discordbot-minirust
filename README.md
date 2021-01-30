# Discord bot [miniRUST]
***NOTE***: *In no way this is a represention of the actual RUST game, this bot is inspired by RUST. This bot is NOT made by any developers of FACEPUNCH. Please message me if anything*.

Just as my other bot (discordbot-dan1k) it is also heavily inspired by the multiplayer game RUST, and got the idea by seeing a bot already created. But wanted to make my own version, make things diffrent.

## Requirements
* This requires Nodejs v12 and up to work
* MongoDB
* PM2 (optional, depends on your need)

## Installation
```
git clone https://github.com/m3kkis/discordbot-minirust.git
cd discordbot-minirust
npm install
```
## Set up
This project uses dotenv package so you wil need to create a `.env` file next to the `app.js`

```
BOT_PREFIX=   // Place a prefix to start your commands
BOT_TOKEN=    // Your bot secret token
DB_HOST=      // URL to your database
BOT_CHANNEL   // ID of the Main Chat Channel
```

***Example***
```
BOT_PREFIX=!
BOT_TOKEN= BfGeThTWwrJwr5rjRJ56tyj.wrjWrt.sSDfhtyjiMKer-QEWytqecnNety
DB_HOST=mongodb://127.0.0.1/minirust

GUILD_ID=61344368f621619917392
MAIN_CHANNEL=6333f6862611991517394
BOT_CHANNEL=63373162f1699581392
DEBUG_CHANNEL=6233368141699517391
```

That is it, you are good to start the bot now.

## Starting up
```
node app.js
```

or if you have PM2 installed

```
pm2 start app.js
```

## After first start up
Make sure you add the id of a channel for the bot in the .env file.

# Tutorial
TUTORIAL IS NOT YET FINISHED NOR STARTED, i'll get to this once the bot is in a functional state.
For now use the !help command.

Start by moving around with `!go <location>`, once you find a nice spot to settle you can do `!base build` this will construct a base at your location, a small one. And you can enter it with `!go base`. If you are unsure of the locations do `!map` or `!loc list`. Whenever you move around you can see who is around with the command `!loc` and if you forget where you are you can always do `!loc me`.

Once you entered your base you can view the required materials to upgrade your base with `!upgrade`. When you decided what you want to upgrade first. Leave your base and head towards a resource location. On your way make sure you look around who is next to you. When you arrive at the resource location you use the command `!collect` and that will gather the resource. On your way back you can stop by each location and do `!loot` to find random loot around you that can be used for crafting other tools.

You can always check your inventory `!inv` to see what you have on you. If you have any items taht you no longer need you do `!drop <inventory_item_number>`. Be careful because once its dropped you can no longer get it back.

You can always refer to commands using `!help` in chat.


#### I believe that covers the tutorial.

## Commands (so far)
* `!base <optional:build>` View your base info, also used to build initial base at current location using build.
* `!collect` Collect resource at current location.
* `!drop <inventory_item_number>` Drop an item from your inventory.
* `!go <location>` Travel to another location. This uses energy.
* `!help` Get the list of commands.
* `!inventory` Show your inventory.
* `!location <optional:list,me>` View players around you, list locations or view your location.
* `!loot` Scavange some loot in your location.
* `!map` View the minirust map.
* `!remove <weapon or armor>` Remove weapon or armor.
* `!roll <amount>` Displays a random number, add a number to set amount to roll.
* `!upgrade <optional:id>` Upgrade your base.
* `!use <inventory_item_number>` Use/equip an item from your inventory.


### Notes
For now there aren't any config file to set up the games
* This bot DB is set by default to `minirust` and you can find the collection `players` and .