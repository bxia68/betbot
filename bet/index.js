const Discord = require('discord.js');
const eco = require("discord-economy");
const client = new Discord.Client();
const Enmap = require("enmap");
const config = require("./config.json");

client.on('ready', () => {
  console.log(`Logged in`);
});

client.on('message', async message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  var command = message.content.toLowerCase().slice(settings.prefix.length).split(' ')[0];

  var args = message.content.split(' ').slice(1);

  switch (command) {
    case "b":
    case "bal":
      if (args[0]) {
        const user = getUserFromMention(args[0]);
        var output = await eco.FetchBalance(user.id)
        message.channel.send(`${user.username} has ${output.balance} bbbweeebs.`);
      } else {
        var output = await eco.FetchBalance(message.author.id)
        message.channel.send(`u has ${output.balance} bbbweeebs.`);
      }
      break;
    case "c":
      //communism
      if (!message.member.roles.find(role => role.name === 'beb bebster')) return message.channel.send("kek");
      switch (args[0]) {
        case "a":
          message.guild.members.forEach(async member => {
            var output = await eco.AddToBalance(member.user.id, args[1]);
          });
          return message.channel.send(`big daddy has decreed that we all get ${args[1]} bbbweeebs.`);
        case "s":
          message.guild.members.forEach(async member => {
            var output = await eco.SetBalance(member.user.id, args[1]);
          });
          return message.channel.send(`big daddy has decreed that we all now have ${args[1]} bbbweeebs.`);
      }
      break;
    case "a":
      //add
      if (!message.member.roles.find(role => role.name === 'beb bebster')) return message.channel.send("kek");

  		const user = getUserFromMention(args[0]);
      var output = await eco.AddToBalance(user.id, args[1])
      message.channel.send(`big daddy has decreed that ${user.username} will receive ${args[1]} beewewebs`)
      break;
    case 'l':
    case "leaderboard":
      eco.Leaderboard({
              limit: 10,
            }).then(async users => {
        const embed = new Discord.RichEmbed()
        .setTitle("Leaderboard")
        .setColor(0x00AE86);
        var embedDescription = '';
        for (var i = 0; i < users.length; i++) {
          if (users[i]) var currentUser = await client.fetchUser(users[i].userid)
          embedDescription += `${i + 1}. ${currentUser.tag} ${users[i].balance} bwebs \n`;
        }
        embed.setDescription(embedDescription);
        message.channel.send({embed});
      });
     break;
     case "p":
       //make pool
       if (!message.member.roles.find(role => role.name === 'beb bebster')) return message.channel.send("kek");
       if (message.guild) {
           // Let's simplify the `key` part of this.
           const key = `${message.guild.id}-${message.author.id}`;
           client.points.ensure(key, {
             user: message.author.id,
             guild: message.guild.id,
             points: 0,
             level: 1
           });
           client.points.inc(key, "points");
             }

       break;

    case "test":
      break;
    default:
  }
});

// function makePool() {
//   return "kek";
// }
//
// class Pool {
//   constructor() {
//     this.pool = [];
//   }
//
//   function joinPool(member) {
//     this.pool.add(member);
//   }
// }
//
// class Bet {
//   constructor(user, price) {
//     this.user = user;
//     this.price = price;
//   }
// }

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.get(mention);
	}
}

client.login(config.token);
