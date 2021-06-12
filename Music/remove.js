const { canModifyQueue } = require("../util/apidev234");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { PREFIX } = require(`../config.json`);



module.exports = {
  name: "remove",
  description: "Remove song from the queue.",
  aliases: ["del"],
  cooldown: 2,
  edesc: `Use this command to remove song from the queue.\nUsage: ${PREFIX}remove <Queue num.>`,

execute(message, args) {
    if(!message.guild) return;
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return attentionembed(message,":x: There is no Queue");
    if (!canModifyQueue(message.member)) return;
    if (!args.length) return attentionembed(message,`:x: Try: ${message.client.prefix}remove <Queue Number>`);
    if (isNaN(args[0])) return attentionembed(message,`:x: Try: ${message.client.prefix}remove <Queue Number>`);
    const song = queue.songs.splice(args[0] - 1, 1);
    message.react("✅")
    queue.textChannel.send(new MessageEmbed()
    .setDescription(`✅ | ${message.author} removed **${song[0].title}** from the Queue`)
    .setColor("#c219d8")
    );
  }
};
