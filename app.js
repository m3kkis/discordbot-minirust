const dotenv = require('dotenv').config();
const Discord = require("discord.js");
const moment = require("moment");
const fs = require('fs');

const mongoose = require('mongoose');
const Player = require('./models/Player'); 

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
    client.user.setActivity('you wandering.', { type: "WATCHING", url:"https://github.com/m3kkis/discordbot-minirust" });
    console.log('[APP] MiniRust is online!');
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

    const embedded = new Discord.MessageEmbed();
    embedded.setAuthor(message.member.user.tag, message.member.user.avatarURL());

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
       
    if (command.args && !args.length) {

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

            command.execute(client, message, args);
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