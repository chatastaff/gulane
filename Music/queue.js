const { MessageEmbed, splitMessage, escapeMarkdown } = require("discord.js");
const { Client, Collection } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { PREFIX } = require(`../config.json`);



module.exports = {
  name: "queue",
  aliases: ["qu"],
  description: "Shows the Music Queue.",
  cooldown: 8,
  edesc: `Use This Command To Get the Songs That would be played.\nUsage: ${PREFIX}queue`,
  execute(message) {
    if(!message.guild) return;
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return attentionembed(message, ":x: There is nothing playing.").catch(console.error);
    console.log(queue.songs);
    let description = "";
    for(let i = 0; i < queue.songs.length; i++){
      description += `**${i}.** [${queue.songs[i].title.substring(0,40)}](${queue.songs[i].url}) | \`${queue.songs[i].duration}\`\n`
    }
    //Queue Embed
    let queueEmbed = new MessageEmbed()
      .setTitle("Music Queue")
      .setDescription(description)
      .setColor("#c219d8");
    const splitDescription = splitMessage(description, {
      maxLength: 2048,
      char: "\n",
      prepend: "",
      append: ""
    });
    splitDescription.forEach(async (m) => {
      queueEmbed.setDescription(m);
      message.react("✅")
      message.channel.send(queueEmbed);
    });
  }
};
