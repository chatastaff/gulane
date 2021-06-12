const { canModifyQueue } = require("../util/apidev234");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed");
const { PREFIX } = require(`../config.json`);



module.exports = {
  name: "skipto",
  aliases: ["st", "jump"],
  description: "Skip to a selected queue song.",
  cooldown: 5,
  edesc: `Use Command to skip to particular song in the queue.\nUsage: ${PREFIX}skipto`,

execute(message, args) {
    if (!message.guild) return;
    message.react("✅").catch(console.error);
    if (!args.length)
      return attentionembed(message, `:x: Try: ${message.client.prefix}${module.exports.name} <Queue Number>`)
    if (isNaN(args[0]))
      return attentionembed(message, `:x: Try: ${message.client.prefix}${module.exports.name} <Queue Number>`)
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return attentionembed(message, ":x: There is no Queue");
    if (!canModifyQueue(message.member)) return;
    if (args[0] > queue.songs.length)
      return attentionembed(message, `:x: The Queue is just ${queue.songs.length} long!`);
    queue.playing = true;
    if (queue.loop) {
      for (let i = 0; i < args[0] - 1; i++) 
        queue.songs.push(queue.songs.shift());
    } else {
      queue.songs = queue.songs.slice(args[0] - 1);
    }
    queue.connection.dispatcher.end();
    queue.textChannel.send(
      new MessageEmbed()
        .setColor("#c219d8")
        .setAuthor(`✅ ${message.author.username}#${message.author.discriminator} skipped ${args[0]} songs`)
    ).catch(console.error);
  }
};
