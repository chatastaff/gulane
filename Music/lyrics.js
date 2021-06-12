const { canModifyQueue } = require("../util/apidev234");
const { Client, Collection, MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const { attentionembed } = require("../util/attentionembed"); 
const { PREFIX } = require(`../config.json`);



module.exports = {
  name: "lyrics",
  aliases: ["ly", "text"],
  description: "Get lyrics for the currently playing song",
  cooldown: 7.5,
  edesc: `Get the Lyrics\nUsage: ${PREFIX}lyrics`,

async execute(message) {

    if(!message.guild) return;

    message.react("✅").catch(console.error);

    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return attentionembed(message, ":x: There is nothing playing");

    if (!canModifyQueue(message.member)) return;

    let lyrics = null;

    let temEmbed = new MessageEmbed()
    .setAuthor("Searching...").setFooter("Lyrics")
    .setColor("#f300e5")

    let result = await message.channel.send(temEmbed)

    try {

      lyrics = await lyricsFinder(queue.songs[0].title,"");

      if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title}.`;
    }

    catch (error) {
      lyrics = `:x: No lyrics found for ${queue.songs[0].title}.`;
    }
    //lyrics Embed
    let lyricsEmbed = new MessageEmbed()
      .setTitle(":pencil: Lyrics :pencil:")
      .setDescription(lyrics)
      .setColor("#f300e5")
 
    if (lyricsEmbed.description.length >= 2048)

      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;

    return result.edit(lyricsEmbed).catch(console.error);
  }
};
