import { MessageEmbed, Message, Client } from 'discord.js'
import { Boss } from '../helpers'
import getBosses from '../helpers/getBosses'

export default async function boss(message:Message,bot:Client,args:Array<string>) { 
  let bosses = await getBosses()

  let highLength:number = bosses.reduce((a, b) => a.name.length > b.name.length ? a : b).name.length

  const generateSpacer = (spacerLength:number) => {
    let string = ''
    for (let i = 0; i < spacerLength; i++) {
      string += ' '
    }
    return string
  }

  let description = bosses.map(boss =>
    `\`${boss.name + generateSpacer(highLength - boss.name.length)}\` - ${boss.code}`
  ).join('\n')

  let embed = new MessageEmbed()
    .setTitle('BOSSES LIST')
    .setColor('GREEN')
    .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
    //.setThumbnail(bot.user.displayAvatarURL())
    .setDescription(description)

  message.channel.send(embed);
}