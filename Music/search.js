const ytsr = require("youtube-sr")
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { PREFIX } = require(`../config.json`);



module.exports = {
  name: "search",
  description: "Search and select videos to play",
  aliases: ["find"],
  cooldown: 3,
  edesc: `Search your song and play it!\nUsage: ${PREFIX}search <TITLE | URL>`,

async execute(message,args,client) {
    if(!message.guild) return;
     const { channel } = message.member.voice;
     const serverQueue = message.client.queue.get(message.guild.id);
    message.react("✅").catch(console.error);
    if (!args.length)
      return attentionembed(message,`:x: Usage: ${message.client.prefix}${module.exports.name} <Video Name>`)
    if (message.channel.activeCollector)
      return attentionembed(message,":x: There is a search active!");
    if (!message.member.voice.channel)
      return attentionembed(message,":x: Please join a Voice Channel first")
    if (serverQueue && channel !== message.guild.me.voice.channel)
    return attentionembed(message, `You must be in the same Voice Channel as me`);
    const search = args.join(" ");
    let temEmbed = new MessageEmbed()
    .setAuthor("Searching...", "https://cdn.discordapp.com/emojis/757632044632375386.gif?v=1")
    .setColor("#f300e5")
    let resultsEmbed = new MessageEmbed()
      .setTitle("✅ Results for: ")
      .setDescription(`\`${search}\``)
      .setColor("#f300e5")
      .setFooter("Response with your favorite number", client.user.displayAvatarURL() )
    try {
      const results = await ytsr.search(search, { limit: 5 });
      results.map((video, index) => resultsEmbed.addField(video.url, `${index + 1}. ${video.title}`));
      const resultsMessage = await message.channel.send(temEmbed)
        await resultsMessage.react("1️⃣");
        await resultsMessage.react("2️⃣");
        await resultsMessage.react("3️⃣");
        await resultsMessage.react("4️⃣");
        await resultsMessage.react("5️⃣");
        await resultsMessage.edit(resultsEmbed)
      message.channel.activeCollector = true;
      let response;
      await resultsMessage.awaitReactions((reaction, user) => user.id == message.author.id,
      {max: 1, time: 60000, errors: ['time'],} ).then(collected => {
          if(collected.first().emoji.name == "1️⃣"){ return response = 1; }
          if(collected.first().emoji.name == "2️⃣"){ return response = 2; }
          if(collected.first().emoji.name == "3️⃣"){ return response = 3; }
          if(collected.first().emoji.name == "4️⃣"){ return response = 4; }
          if(collected.first().emoji.name == "5️⃣"){ return response = 5; }
          else{
            response = "error";
          }
        });
      if(response === "error"){
        attentionembed(message,":x: Please use a right emoji!");
        return resultsMessage.delete().catch(console.error);
      }
      const choice = resultsEmbed.fields[parseInt(response) - 1].name;
      message.channel.activeCollector = false;
      message.client.commands.get("play").execute(message, [choice]);
      resultsMessage.delete().catch(console.error);
    } catch (error) {
      console.error(error);
      message.channel.activeCollector = false;
    }
  }
};
