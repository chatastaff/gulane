const { canModifyQueue } = require("../util/apidev234");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { PREFIX } = require(`../config.json`);



module.exports = {
  name: "stop",
  description: "Stops the music.",
  aliases: ["leave", "end"],
  cooldown: 5,
  edesc: `Use command to end the music.\nUsage: ${PREFIX}stop`,

async execute(message,args,client) {
  if (!message.guild) return;
  message.react("✅").catch(console.error);
  const { channel } = message.member.voice;
  const queue = message.client.queue.get(message.guild.id);
  if (!channel) return attentionembed(message, ":x: Please join a Voice Channel first");  
  if (queue && channel !== message.guild.me.voice.channel)
  return attentionembed(message, `:x: You must be in the same Voice Channel as me`);
  if (!queue)
    return attentionembed(message, ":x: There is nothing you can stop!");
  if (!canModifyQueue(message.member)) return;
  await channel.leave();  
  message.channel.send(new MessageEmbed()
  .setColor("#c219d8")
  .setAuthor(`✅ ${message.author.username} stopped the music!`))
  .catch(console.error);
  }
};
