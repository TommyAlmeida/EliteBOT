const Discord = module.require('discord.js');
var fortnite = require('fortnite');
var request = require('request');

exports.run = async (bot, message, args, prefix, con, file) => {

  var headers = {
    'TRN-Api-Key': "3d36b586-da6e-4733-b252-77d26aacf2ce"
  }

  var options = {
    url: `https://api.fortnitetracker.com/v1/profile/` + `pc` + "/" + `${args[0]}`,
    method: 'GET',
    headers: headers
  }

  request(options, function (error, response, body) {
    var info = JSON.parse(body);

    var LifeTime = "";
    var Solo = "";
    var Duo = "";
    var Squad = "";

    for(var currentStatIndex = 0; currentStatIndex < info.lifeTimeStats.length; currentStatIndex++) {
        LifeTime += info.lifeTimeStats[currentStatIndex].key + ": " + info.lifeTimeStats[currentStatIndex].value + "\n";
    }

    for(var STATS in info.stats.p2){
        Solo += info.stats.p2[STATS].label + ": " + info.stats.p2[STATS].displayValue + "\n";
    }

    for(var STATS_1 in info.stats.p10){
        Duo += info.stats.p10[STATS_1].label + ": " + info.stats.p10[STATS_1].displayValue + "\n";
    }

    for(var STATS_2 in info.stats.p9){
        Squad += info.stats.p9[STATS_2].label + ": " + info.stats.p9[STATS_2].displayValue + "\n";
    }

    message.channel.send("```" + "\n" +
                         "----------------------------------" + "\n" + 
                         "Nick: " + info.epicUserHandle + "\n" +
                         "Plataforma: " + info.platformNameLong + "\n" +
                         "----------LIFETIME STATS----------" + "\n" + 
                         LifeTime + "\n" +

                         "------------SOLO STATS------------" + "\n" +
                         Solo + "\n" +

                         "------------DUO STATS-------------" + "\n" +
                         Duo + "\n" +

                         "------------SQUAD STATS-----------" + "\n" +
                         Squad + "\n"+ "```");
})
}

exports.help = {
    name: "fortnite"
}