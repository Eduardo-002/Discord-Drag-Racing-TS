import { MessageEmbed } from 'discord.js'

export default async function boss({message,bot}:{message:any,bot:any}) {
  interface Boss {
    id: string,
    name: string,
    color: string
  }

  let getBosses = await import(process.env.basedir+'/Commands/bosses/helpers/getBosses')
  let bosses:Array<Boss> = await getBosses.default()

  let highLength:number = bosses.reduce((a, b) => a.name.length > b.name.length ? a : b).name.length

  const generateSpacer = (spacerLength:number) => {
    let string = ''
    for (let i = 0; i < spacerLength; i++) {
      string += ' '
    }
    return string
  }

  let description = bosses.map(boss =>
    `\`${boss.name + generateSpacer(highLength - boss.name.length)}\` - ${boss.id}`
  ).join('\n')

  let embed = new MessageEmbed()
    .setTitle('BOSSES LIST')
    .setColor('GREEN')
    .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
    //.setThumbnail(bot.user.displayAvatarURL())
    .setDescription(description)

  message.channel.send(embed);
}