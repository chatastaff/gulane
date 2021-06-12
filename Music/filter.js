const ytsr = require("youtube-sr")
const { Client, Collection, MessageEmbed } = require("discord.js");
const { play } = require("../include/play")
const { attentionembed } = require("../util/attentionembed");
const { PREFIX, } = require(`../config.json`);



module.exports = {
  name: "filter",
  description: "Set Effects for music",
  aliases: ["f"],
  cooldown: 5,
  edesc: `Filters in Music \nUsage: ${PREFIX}filter <Filtertype>`,

async execute(message, args, client) {
    if (!message.guild) return;
    const { channel } = message.member.voice;
    const queue = message.client.queue.get(message.guild.id);
    message.react("✅").catch(console.error);
    if (message.channel.activeCollector)
      return attentionembed(message, ":x: There is a search active!");
    if (!message.member.voice.channel)
      return attentionembed(message, ":x: Please join a Voice Channel first")
    if (queue && channel !== message.guild.me.voice.channel)
      return attentionembed(message, `You must be in the same Voice Channel as me`);
     //Filters
    const filters = [
      'bass=g=20,dynaudnorm=f=200',//bassboost
      'apulsator=hz=0.08', //8D
      'aresample=48000,asetrate=48000*0.8',//vaporwave
      'aresample=48000,asetrate=48000*1.25',//nightcore
      'aphaser=in_gain=0.4',//phaser
      'tremolo',//tremolo
      'vibrato=f=6.5',//vibrato
      'surround',//surrounding
      'apulsator=hz=1',//pulsator
      'asubboost',//subboost
      "remove",
    ];
    //Temp variables
    let varforfilter; let choice;
    //User Input
    switch (args[0]) {
      case "bassboost":
        varforfilter = 0;

        break;
      case "8D":
        varforfilter = 1;
        break;
      case "vaporwave":
        varforfilter = 2;
        break;
      case "nightcore":
        varforfilter = 3;
        break;
      case "phaser":
        varforfilter = 4;
        break;
      case "tremolo":
        varforfilter = 5;
        break;
      case "vibrato":
        varforfilter = 6;
        break;
      case "surrounding":
        varforfilter = 7;
        break;
      case "pulsator":
        varforfilter = 8;
        break;
      case "subboost":
        varforfilter = 9;
        break;
      case "clear":
      varforfilter = 10;
      break;
      default:
        //fires if not valid input
        varforfilter = 404;
        message.channel.send(new MessageEmbed()
        .setColor("#c219d8")
        .setTitle(":x: Not a valid Filter, use one of those:")
        .setDescription(`
        \`bassboost\`
        \`8D\`
        \`vaporwave\`
        \`nightcore\`
        \`phaser\`
        \`tremolo\`
        \`vibrato\`
        \`surrounding\`
        \`pulsator\`
        \`subboost\`
        \`clear\`   ---  removes all filters`)
        .setFooter(`:white_check_mark: Example: ${PREFIX}filter bassboost`)
        )
        break;
    }

    choice = filters[varforfilter];
    if (varforfilter === 404) return;
    try {
      const song = queue.songs[0];
      message.channel.send(new MessageEmbed()
      .setColor("#c219d8")
      .setAuthor(":white_check_mark: Applying: " + args[0])).then(msg =>{
        msg.delete({timeout: 2000});
      })
      play(song, message, client, choice);
    } catch (error) {
      console.error(error);
      message.channel.activeCollector = false;
    }
  }
};
