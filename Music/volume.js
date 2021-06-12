const { canModifyQueue } = require("../util/apidev234");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { PREFIX } = require(`../config.json`);



module.exports = {
  name: "volume",
  aliases: ["vol"],
  description: "Increase/Decrease The Song volume.",
  cooldown: 5,
  edesc: `Use This To Change The Volume of song.\nUsage: ${PREFIX}volume <0-200>`,

execute(message, args) {
    if(!message.guild) return;
    message.react("✅");
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return attentionembed(message,`:x: There is nothing playing`); 
    if (!canModifyQueue(message.member)) return;
    const volinfoembed = new MessageEmbed()
    .setColor("#c219d8")
    .setTitle(`🔊 Volume is: \`${queue.volume}%\``) 			
    if (!args[0]) return message.channel.send(volinfoembed).catch(console.error);
    if (isNaN(args[0])) return attentionembed(message,":x: That's not a Number between **0 & 200**");
    if (parseInt(args[0]) < 0 || parseInt(args[0]) > 200)
      return attentionembed(message,":x: That's not a Number between **0 & 200**");
    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    const volinfosetembed = new MessageEmbed()   
    .setColor("#c219d8")
    .setTitle(`🔊 Volume changed to: \`${args[0]}%\`!`)  
    return queue.textChannel.send(volinfosetembed).catch(console.error);
  }
};
