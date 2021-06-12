const { canModifyQueue } = require("../util/apidev234");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { PREFIX } = require(`../config.json`);



module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Resume currently playing music",
  cooldown: 5,
  edesc: `Type this command to resume the paused Song!\nUsage: ${PREFIX}resume`,
  
execute(message) {
    if(!message.guild) return;
    message.react("✅").catch(console.error);
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return attentionembed(message,"There is nothing playing!").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      const playembed = new MessageEmbed().setColor("#c219d8")
      .setAuthor(`✅ ${message.author.username} resumed the music!`)
      return queue.textChannel.send(playembed).catch(console.error);
    }
    return  attentionembed(message, ":x: The Queue is not paused!").catch(console.error);
  }
};
