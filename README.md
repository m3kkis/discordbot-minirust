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
CHANNEL_MAIN_ID=6337368621699517390
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
With the new update coming to this bot, lots of things have changed. Heres a quick tutorial on how to play this discord game.

##### Settling down
First thing to do is to find a location that suits you. You can check the map using `!map` and then you can travel using the command `!go <location>`. The tiles must be touching each other to be able to travel to the location. If


#### I believe that covers the tutorial.

## Commands (so far)
* `!base <optional:build>` View your base info, also used to build initial base at current location using build.
* `!go <location>` Travel to another location. This uses energy.
* `!help` Get the list of commands.
* `!location <optional:list,me>` View players around you, list locations or view your location.
* `!map` View the minirust map.
* `!roll <amount>` Displays a random number, add a number to set amount to roll.


### Notes
For now there aren't any config file to set up the games
* This bot DB is set by default to `minirust` and you can find the collection `players` and .