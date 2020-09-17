import { MessageEmbed, Message, Client } from 'discord.js'
import { Boss,Claim } from '../helpers'
import getBosses from '../helpers/getBosses'
import getClaims from '../helpers/getClaims'

export default async function boss(message:Message,bot:Client,args:Array<string>) {
  
  let bosses = await getBosses()

  const chosenBoss:Boss|undefined = bosses.find((e:Boss)=>e.id==args[0])

  if(chosenBoss){
    let claims = await getClaims(chosenBoss)
    
    let description = claims.map((claim:Claim) => `${claim.index}º :: ${claim.username}`).join('\n')
    description = description==''?'Without Claims!':description
    
    let embed = new MessageEmbed()
      .setTitle(chosenBoss.name)
      .setColor(chosenBoss.color)
      .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
      //.setThumbnail(bot.user.displayAvatarURL())
      .setDescription(description)

    message.channel.send(embed);
  }else{
    message.reply('That\'s not a boss code')
    message.channel.send('!bosses');
  }
}