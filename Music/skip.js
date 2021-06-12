const { canModifyQueue } = require("../util/apidev234");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed");
const { PREFIX } = require(`../config.json`);



module.exports = {
  name: "skip",
  aliases: ["s"],
  description: "Skip the currently playing song",
  cooldown: 5,
  edesc: `Use The Command to Skip The Current Song.\nUsage: ${PREFIX}skip`,

execute(message) {
    if (!message.guild) return;
    message.react("✅").catch(console.error);
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return attentionembed(message, "There is nothing you can skip!").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel.send(
      new MessageEmbed().setColor("#c219d8").setAuthor(`${message.author.username} skipped the song.`)
    ).catch(console.error);
  }
};
