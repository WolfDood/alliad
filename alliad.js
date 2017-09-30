// Alliad, made by crngegod

// Requirements
const Discord = require("discord.js");
const chalk = require("chalk");
const config = require("./src/config.json");
const rs = require("./src/json/responses.json");
const help = require("./src/embeds/help.json");
const jokes = require("./src/json/funnyjoke.json");
const eightball = require("./src/json/8ball.json");
const greetings = require("./src/json/greetings.json");

// Variables
const prefix = config.prefix;
const defaultgame = (config.prefix + config.game);
const client = new Discord.Client();

// Start up
console.log(chalk.green(`[INFO] ${config.name} is starting...`));

client.on("ready", () => {
	console.log(chalk.green(`[INFO] ${client.user.username}#${client.user.discriminator} is running`));
	client.user.setGame(defaultgame);
});

// Upon joining a server
client.on("guildCreate", guild => {
	guildinvite = console.log(chalk.green(`[INFO] I have been invited to ${guild.name}`));
	client.channels.get("355240822330884108").send(guildinvite);
});

// Upon being removed from a server
client.on("guildDelete", guild => {
	guildremove = console.log(chalk.red(`[INFO] I have been removed from ${guild.name}`));
	client.channels.get("355240822330884108").send(guildremove);
});

// Main
client.on("message", message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return message.channel.send(rs.dmrequest);

	if(message.content.indexOf(config.prefix) !== 0) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  	const command = args.shift().toLowerCase();
  	const argsspc = args.join(" ");
	
	var realcommand = true;

	if (command === "help") {
		let helpembed = new Discord.RichEmbed().setAuthor(help.author).setColor(config.theme).setDescription(help.desc).setTitle(help.cmtitle).addField(help.generaltitle, help.general).addField(help.funtitle, help.fun).addField(help.misctitle, help.misc).addField(help.servertitle, help.server)/*.setThumbnail(client.user.avatarURL)*/.setFooter(config.credits);
		message.channel.send(helpembed);
	} else if (command === "latency") {
		message.channel.send(`Latency: \`${Date.now() - message.createdTimestamp} ms\``);
	} else if (command === "user") {
		let userembed;
		if (!args[0]) {
            userembed = new Discord.RichEmbed().setAuthor(`${message.author.username}'s Info`).setColor(config.theme).setThumbnail(message.author.avatarURL).addField("Full Username", `${message.author.username}#${message.author.discriminator}`).addField("ID", message.author.id).addField("Date Created", message.author.createdAt);
            try {
                userIDToGet = message.mentions.users.first();
                userembed = new Discord.RichEmbed().setAuthor(`${userIDToGet.username}'s Info`).setColor(config.theme).setThumbnail(userIDToGet.avatarURL).addField("Full Username", `${userIDToGet.username}#${userIDToGet.discriminator}`).addField("ID", userIDToGet.id).addField("Date Created", userIDToGet.createdAt);
		message.channel.send(userembed);
            } catch(e) {
                message.channel.send("Please mention a user.");
	    }
	} else if (command === "server") {
		let serverembed = new Discord.RichEmbed().setAuthor("Server Info").setColor(config.theme).setThumbnail(message.guild.iconURL).addField("Name", message.guild.name).addField("Members", message.guild.memberCount).addField("Owner", message.guild.owner).addField("Date Created", message.guild.createdAt).addField("Region", message.guild.region);
		message.channel.send(serverembed);
	} else if (command === "id") {
        if (!args[0]) {
            message.channel.send(message.author.id);
        } else {
            try {
                userIDToGet = message.mentions.users.first();
                message.channel.send(userIDToGet.id);
            } catch(e) {
                message.channel.send("Please mention a user.")
            }
        }
	} else if (command === "setgame") {
		if (config.controllers.includes(message.author.id)) {
			gameName = argsspc;
			if (args[0] === "<default>") {
				client.user.setGame(defaultgame);
			} else {
				client.user.setGame(gameName);
			}
		} else {
			message.channel.send("You don't have the permissions to do that.");
		}
	} else if (command === "avatar") {
		if (!args[0]) {
			let embed = new Discord.RichEmbed()
				.setImage(message.author.avatarURL);
			message.channel.send(embed)
		} else {
			try {
				userAvToGet = message.mentions.users.first();
				let embed = new Discord.RichEmbed()
					.setImage(userAvToGet.avatarURL);

				message.channel.send(embed)
			} catch(e) {
				message.channel.send("Please mention a user.")
			}
		}
	} else if (command === "joke") {
		message.channel.send(jokes[Object.keys(jokes)[Math.floor(Math.random()*Object.keys(jokes).length)]]);	
	} else if (command === "8ball") {
		if (!args[0]) return message.channel.send("Please ask a question.");
		message.channel.send(eightball[Object.keys(eightball)[Math.floor(Math.random()*Object.keys(eightball).length)]]);
	} else if (command === "say") {
    	message.delete().catch(O_o=>{});
    	message.channel.send(argsspc);
	} else if (command === "test") {
		message.channel.send("Bot is active.")
	} else if (command === "greetings") {
		message.channel.send(greetings[Object.keys(greetings)[Math.floor(Math.random()*Object.keys(greetings).length)]]);
	}  else if (command === "eval") {
		if (!config.controllers.includes(message.author.id)) return message.channel.send(rs.noperms);
		try {
			eval(argsspc);
 		} catch(err) {
 			message.channel.send("```" + err + "```");
 	} else {
		realcommand = false;
	}
	if (realcommand) {
		console.log(chalk.yellow(`[COMMAND] [${command}] [${argsspc}] from ${message.author.username}#${message.author.discriminator} in ${message.guild.name}`));
	}
});

try {
	client.login(process.env.BOT_TOKEN);
} catch(e) {
	console.log(chalk.red(`[ERROR] ${e}`));
}
