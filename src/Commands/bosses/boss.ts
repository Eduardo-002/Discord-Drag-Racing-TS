import { MessageEmbed } from 'discord.js'
import { db } from './../../Services/firebase'

interface Boss {
  id: string,
  name: string,
  color: string
}

interface Claim {
  index: string,
  username: string
}

const getBosseClaims = ({ id }:{id:string}) => {
  let promise:any = new Promise((resolve) => {
    db.collection('bosses').doc(id).collection('claim').orderBy('index', 'asc').get()
      .then(snapshots => {
        let claims:Array<Claim> = []
        snapshots.forEach(doc => {
          let data:any = doc.data()
          claims.push({index:data.index,username:data.username})
        })
        resolve(claims)
      })
  })
  return promise
}

export default async function list({message,bot,args}:{message:any,bot:any,args:Array<string>}) {
  
  let getBosses = await import(process.env.basedir+'/Commands/bosses/helpers/getBosses')
  let bosses:Array<Boss> = await getBosses.default()

  const chosenBoss:Boss|undefined = bosses.find((e:Boss)=>e.id==args[0])

  if(chosenBoss){
    const claims:Array<Claim> = await getBosseClaims({id:chosenBoss.id})

    let description = claims.map((claim:Claim) => `${claim.index}º :: ${claim.username}`).join('\n')

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