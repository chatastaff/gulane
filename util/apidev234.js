const { MessageEmbed } = require("discord.js");



module.exports = {
 async canModifyQueue(member) {
    let resultsEmbed = new MessageEmbed()
      .setTitle("❗️ | You must be in the Same Voice Channel as me!")
      .setColor("#ff0e7a")
    if (member.voice.channel !== member.guild.me.voice.channel) {
      member.send(resultsEmbed);
      return false;
    }
    return true;
  }
};
