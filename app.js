const dotenv = require('dotenv').config();
const Discord = require("discord.js");
const moment = require("moment");
const fs = require('fs');

const mongoose = require('mongoose');
const Player = require('./models/player'); 

const prefix = process.env.BOT_PREFIX;
const client = new Discord.Client();
client.commands = new Discord.Collection();

//Set files in /commands as your commands
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

//Connect to DB
mongoose.connect(process.env.DB_HOST,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('[APP] Now connected to MongoDB!'))
    .catch(err => console.error('[APP] Something went wrong with MongoDB', err));

//Connect bot
client.once('ready', () => {
    //Set bot status
    client.user.setActivity('your private data.', { type: "WATCHING", url:"https://github.com/m3kkis/discordbot-minirust" });

    const guild = client.guilds.cache.get(process.env.GUILD_ID);

    console.log('[APP] MiniRust is online!');

    /*
    const channel = client.channels.cache.find(channel => channel.id === process.env.MAIN_CHANNEL)
            
    var embeddedBot = new Discord.MessageEmbed();
    embeddedBot.setColor('#d62d2d')
        .setDescription(`**miniRUST** Bot is now online.`)

    channel.send(embeddedBot)
    */



    //Create role for miniRUST, after that don't forget to set role as separate.
    try{
        var role = guild.roles.cache.find(x => x.name === "mRUST");
        if(role.name == "mRUST") {
            console.log("[APP] mRUST Role Already Exists");
        }
    }
    catch(e){
        console.log("[APP] Role doesn't exists, creating role mRUST");
        guild.roles.create({ data: { name: 'mRUST', color: '#d62d2d', permissions: ['CREATE_INSTANT_INVITE', 'CHANGE_NICKNAME', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS', 'CONNECT', 'SPEAK', 'STREAM', 'USE_VAD'] } });
    }

});

//Wait for message
client.on('message', message => {

    /**
     * COLORS USED:
     * 
     * GREEN:       #78de87
     * ORANGE:      #ffd900
     * RED:         #ff4f4f
     * BLUE:        #03b6fc
     * PURPLE:      #ae00ff
     * PINK:        #ff69af
     * DARKBLUE:    #031cfc
     * POLICEBLUE:  #3849ff
     * TOXICGREEN:  #84ff00
     */

    
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    if(message.channel instanceof Discord.DMChannel) return message.reply('I don\'t take commands in DM, please use the bot channel to play **miniRUST**');
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));









    // give and remove role of bot channel
    
    if(commandName == "join")
    {
        var userRole = message.guild.member(message.author.id).roles.cache.find(r => r.name === "mRUST")

        if(userRole != undefined)
        {
            console.log("[APP] This user has the role already.");
            return message.reply("you already have access to the bot channel...");
        }
        else
        {
            
            var role = message.guild.roles.cache.find(r => r.name === "mRUST");
            message.guild.member(message.author.id).roles.add(role);

            var attachment = new Discord.MessageAttachment('./images/minirust_logo.png', 'minirust_logo.png');

            var embeddedMain = new Discord.MessageEmbed();
            embeddedMain.setColor('#d62d2d')
                .setAuthor(message.member.user.tag, message.member.user.avatarURL())
                .setTitle("*Welcome to miniRUST!*")
                .setDescription(`**!! BOT IS NOT FINISHED YET !!**\nTo play __go to the bot channel__.\n\nIf you need help with commands do \`${process.env.BOT_PREFIX}help\` or you can visit \nhttps://github.com/m3kkis/discordbot-minirust#Tutorial\n for a quick tutorial.`)
                .setFooter(`___\nType "${process.env.BOT_PREFIX}leave" to remove channel at any time. Your progress will still be saved.`)
                .attachFiles(attachment)
                .setThumbnail('attachment://minirust_logo.png');
            
            message.channel.send(embeddedMain);

            const channel = client.channels.cache.find(channel => channel.id === process.env.BOT_CHANNEL)
            
            var embeddedBot = new Discord.MessageEmbed();
            embeddedBot.setColor('#d62d2d')
                .setAuthor(message.member.user.tag, message.member.user.avatarURL())
                .setDescription(`A new player has joined the battle.`)

            return channel.send(embeddedBot)
        }


    }
    else if(commandName == "leave")
    {

        var userRole = message.guild.member(message.author.id).roles.cache.find(r => r.name === "mRUST")

        if(userRole == undefined)
        {
            console.log("[APP] This user can't leave because no roles.");
            return message.reply("can't leave something you never joined...");
        }
        else
        {
            var role = message.guild.roles.cache.find(r => r.name === "mRUST");
            message.guild.member(message.author.id).roles.remove(role);

            var embedded = new Discord.MessageEmbed();
            embedded.setColor('#d62d2d')
                .setAuthor(message.member.user.tag, message.member.user.avatarURL())
                .setDescription(`**Goodbye**\nYou shall not be missed!`)

            return message.channel.send(embedded);
        }



    }
    //////////////////////////////////////









    if (!command) return;
    if(message.channel.id != process.env.BOT_CHANNEL && message.channel.id != process.env.DEBUG_CHANNEL) return message.reply(`Please use the bot channel to play **miniRUST**, you can always join the fun by typing \`${process.env.BOT_PREFIX}join\` in the main chat channel`);


    if (command.args && !args.length) {

        var embedded = new Discord.MessageEmbed();
        embedded.setAuthor(message.member.user.tag, message.member.user.avatarURL());

        var reply = 'You didn\'t provide any arguments!';

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        
        embedded.setColor('#ff4f4f')
            .setDescription(reply);

        return message.channel.send(embedded);
        
    }

    Player.findOne({
        dsid: message.author.id
    })
    .then(_Player => {
        if(_Player)
        {
            console.log("[APP] Player found.");

            command.execute(client, message, args, _Player);
        }
        else
        {
            console.log("[APP] Creating new player.");

            let _Player = new Player({
                dsid: message.author.id,
                tag: message.author.tag,
                username: message.author.username
            });

            _Player.save().then(console.log("[APP] New player created."));
            message.reply('I just created an account for you, try your command again.');
        }
    });

});

//token&prefix in .env
client.login(process.env.BOT_TOKEN);