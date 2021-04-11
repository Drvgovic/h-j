const Discord = require("discord.js");
const ytdl = require("ytdl-core");

const Client = new Discord.Client;

const prefix = "?";

var list = [];

Client.on("ready", () => {
    console.log ("BOT OP");
});
    

Client.on("message", message => {
    if(message.content.startsWith(prefix + "play")){
        if(message.member.voice.channel){
            let args = message.content.split(" ");

            if(args[1] == undefined || !args[1].startsWith("https://www.youtube.com/")){
                message.reply("Vidéo Youtube Uniquement")
            }
            else {
                if(list.length > 0){
                    list.push(args[1]);
                    message.reply("-> Vidéo ajouté à la liste");
                }
            }
            message.member.voice.channel.join().then(connection => {
                let args = message.content.split(" ");
                
                let dispatcher = connection.play(ytdl(args[1], { quality: "highestaudio" }));

                dispatcher.on("finish", () => {
                    dispatcher.destroy();
                    connection.disconnect();
                });

                dispatcher.on("error", err => {
                    console.log("erreur :" + err);
                }); 
            }).catch(err => {
                message.reply("Erreur lors de la connection :" + err);
            })
        }
        else {
            message.reply("Vous n'etes pas dans un Salon Vocal");
        }
    }
});
        
Client.login(process.env.TOKEN);   