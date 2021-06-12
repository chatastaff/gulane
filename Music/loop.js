const { canModifyQueue } = require("../util/apidev234");
const { MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { PREFIX } = require(`../config.json`);



module.exports = {
  name: "loop",
  aliases: ['l'],
  description: "Toggle music loop",
  cooldown: 3,
  edesc: `Loop The Music Queue\nUsage: ${PREFIX}loop`,
async execute(message) {
    if(!message.guild) return;
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return attentionembed(message, "There is nothing playing").catch(console.error);
    if (!await canModifyQueue(message.member)) return;
    queue.loop = !queue.loop;
    const loopembed = new MessageEmbed()
    .setColor(queue.loop ? "#c219d8" : "#ff0e7a")
    .setAuthor(`✅ Loop is now ${queue.loop ? " enabled" : " disabled"}`)
    message.react("✅");
    return queue.textChannel
      .send(loopembed)
      .catch(console.error);
  }
};
