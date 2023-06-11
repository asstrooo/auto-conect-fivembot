const Discord = require("discord.js");
const axios = require('axios')
const client = new Discord.Client({ intents: 32767 });
const config = require('./config.json');
const colors = require('colors')

/**
 * @param {Discord.Message} message
 */

client.on("ready", async(message) => {
    console.log(colors.blue('[#] Bot iniciado com sucesso, update sendo realizado dentro de segundos.'))

    var data = { players: "" }

    async function message() {

        async function update_info() {

            await axios.get(`http://${config.ip}:${config.porta}/players.json`).then(response => {
                console.log(colors.green('[+] Ediando Mensaje...'))
                data.players = response.data.length
            }).catch(err => data.players = -1)
        }

        await update_info()

        await client.channels.cache.get(config.Canal).bulkDelete(100).catch(() => console.error)

        if (data.players === -1) {
            var embed = new Discord.MessageEmbed()

            .setColor('#ff0000')
                .setTitle('[❌] SERVIDOR APAGADO')
                .addField(`Players:`, `\`\`\`ini\n [ 0/64 ] \`\`\``, true)
                .addField('**Status:**', '```Bash\n🔴 Offline ```', true)
                .addField('**IP Servidor:**', `\`\`\`Esperando a que el servidor se estabilice!\`\`\``, false)
                .addField('**Invite discord**:', `\`\`\`${config.discordinvite}\`\`\``, false)
                .setThumbnail(config.Logo)

        } else {
            var embed = new Discord.MessageEmbed()

            .setTitle(config.Titulo)
                .setColor('#55ff00')
                .setURL ("https://cfx.re/join/ry67gx")
                .addField(`[<:players:1117034374500712509> ] Jugadores:`, `\`\`\`ini\n [ ${data.players}/64 ] \`\`\``, true)
                .addField('**[<:status:1117034372583936090>] Status:**', '```Bash\n🟢 Online ```', true)
                .addField('**[<:sucesso:1117034375729651773>] IP Servidor:**', `\`\`\`${config.ip2}\`\`\``, false)
                .addField('**[<:discordlogotransparentgray3:1116324577295999068>] Invite Discord**:', `\`\`\`${config.discordinvite}\`\`\``, false)
                .setFooter("[!] By ♥ !Ramzy")
                .setThumbnail(config.Logo)      
              




        }

        const CFX = new Discord.MessageButton()

        .setStyle("LINK")
            .setLabel(`FiveM`)
            .setEmoji('878251971021246465')
            .setURL(config.connect.url)
            

        const ts = new Discord.MessageButton()

        .setStyle("LINK")
            .setLabel(`Discord`)
            .setEmoji('1116324577295999068')
            .setURL(config.DISCORD.url)

        const row = new Discord.MessageActionRow().addComponents([CFX, ts])

        await client.channels.cache.get(config.Canal).send({
            components: [row],
            embeds: [embed]
        }).then(msg => {

            setInterval(async() => {
                if (data.players === -1) {
                    embed.fields[0].value = `\`\`\`ini\n [ 0/64 ] \`\`\``
                    embed.fields[1].value = `\`\`\`Bash\n "🔴 Offline " \`\`\``
                    msg.edit({ embeds: [embed] })
                } else {
                    embed.fields[0].value = `\`\`\`ini\n [ ${data.players}/64 ] \`\`\``
                    embed.fields[1].value = `\`\`\`Bash\n "🟢 Online " \`\`\``
                    msg.edit({ embeds: [embed] })
                }
                async function update_info() {
                    await axios.get(`http://${config.ip}:${config.porta}/players.json`).then(response => {
                        console.log(colors.green('[+] Update Mensaje...'))
                        data.players = response.data.length
                    }).catch(err => data.players = -1)
                }
                await update_info()
            }, 15000);
        })
    }
    message()
})

function presence() {
    let statuses = [
      `BY ♥ !RAMZY`,
      `${client.users.cache.size} usuarios`
    ];
  
    setInterval(function () {
  
      let status = statuses[Math.floor(Math.random() * statuses.length)];
      client.user.setActivity(status, { type: "WATCHING", status: 'dnd' });
  
    }, 10000);
  
  }
  

client.login(config.token);
