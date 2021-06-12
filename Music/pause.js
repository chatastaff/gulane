const { canModifyQueue } = require("../util/apidev234");
const { Client, Collection, MessageEmbed } = require("discord.js");

const { attentionembed } = require("../util/attentionembed"); 
const { PREFIX } = require(`../config.json`);
module.exports = {
  name: "pause",
  description: "Pause The Current Music.",
  cooldown: 5,
  edesc: `Type to stop the music!\nUsage: ${PREFIX}pause`,
  execute(message) {
    if(!message.guild) return;
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return attentionembed(message, ":x: There is nothing playing").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    if (queue.playing) {
      queue.playing = false;
      //Pause The Music
      queue.connection.dispatcher.pause(true);
      //Pause Embed
      const pauseembed = new MessageEmbed().setColor("#c219d8")
      .setAuthor(`✅ ${message.author.username} paused the music.`)
      message.react("✅")
      return queue.textChannel.send(pauseembed.catch(console.error);
    }
  }
};
