const createBar = require("string-progressbar");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { PREFIX } = require(`../config.json`);



module.exports = {
  name: "nowplaying",
  aliases: ['np'],
  description: "Show current song",
  cooldown: 5,
  edesc: `Command which shows u the current song :D\nUsage: ${PREFIX}nowplaying`,
  
execute(message) {
    if(!message.guild) return;
    message.react("✅")
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return attentionembed(message, "There is nothing playing.").catch(console.error);
    //Defining Now Playing
    const song = queue.songs[0];
    let minutes = song.duration.split(":")[0];   
    let seconds = song.duration.split(":")[1];    
    let ms = (Number(minutes)*60+Number(seconds));   
    let thumb;
    if (song.thumbnail === undefined) thumb = "https://media.discordapp.net/attachments/839913070272708618/852951966489509908/6b2f1c5dba92f48a53020755a9887e06.gif?width=450&height=450";
    else thumb = song.thumbnail.url;
    const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
    const left = ms - seek;
    //Defining The Embed
    let nowPlaying = new MessageEmbed()
      .setTitle("Now playing")
      .setDescription(`[**${song.title}**](${song.url})`)
      .setThumbnail(song.thumbnail.url)
      .setColor("#c219d8")
      .setFooter("Time Remaining: " + new Date(left * 1000).toISOString().substr(11, 8));
      //If STREAM;
      if(ms >= 10000) {
        nowPlaying.addField("\u200b", "🔴 LIVE", false);
        return message.channel.send(nowPlaying);
      }
      //IF not STREAM
      if (ms > 0 && ms<10000) {
        nowPlaying.addField("\u200b", "**[" + createBar((ms == 0 ? seek : ms), seek, 25, "▬", "⚪️")[0] + "]**\n**" + new Date(seek * 1000).toISOString().substr(11, 8) + " / " + (ms == 0 ? " ◉ LIVE" : new Date(ms * 1000).toISOString().substr(11, 8))+ "**" , false );
        return message.channel.send(nowPlaying);
      }
  }
};
