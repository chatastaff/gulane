const { canModifyQueue } = require("../util/apidev234");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { PREFIX } = require(`../config.json`);



module.exports = {
  name: "shuffle",
  aliases: ["mix"],
  description: "Shuffles the current Queue!",
  cooldown: 5,
  edesc: `Type the Command, if a Queue exists to change to Order of the Queue, randomly.\nUsage: ${PREFIX}shuffle`,

execute(message,args,client) {
    if(!message.guild) return;
    message.react("✅").catch(console.error);
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return attentionembed(message, ":x: There is no Queue.");
    if (!canModifyQueue(message.member)) return;
    let songs = queue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    queue.songs = songs;
    message.client.queue.set(message.guild.id, queue);
    queue.textChannel.send(new MessageEmbed()
    .setDescription(`**✅ | ${message.author} shuffled the Queue**`)
    .setColor("#c219d8")).catch(console.error);
  }
};
