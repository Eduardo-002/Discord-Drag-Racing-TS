import { MessageEmbed } from 'discord.js'
import { db } from './../Services/firebase'

const getBosses = () => {
  return new Promise(resolve => {
    db.collection("bosses").get()
      .then(snapshot => {
        let bosses = []
        snapshot.forEach(doc => {
          bosses.push({ id: doc.id, name: doc.data().name, color: doc.data().color })
        })
        resolve(bosses)
      })
  })
}

const getBosseClaims = ({ boss }) => {
  return new Promise(resolve => {
    db.collection('bosses').doc(boss).collection('claim').orderBy('index', 'asc').get()
      .then(snapshots => {
        let claims = []
        snapshots.forEach(doc => {
          claims.push(doc.data())
        })
        resolve(claims)
      })
  })
}

const listBosses = ({ bosses, message, bot }) => {
  let highLength = bosses.reduce((a, b) => a.name.length > b.name.length ? a : b).name.length

  const generateSpacer = (spacerLength) => {
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
    .setThumbnail(bot.user.displayAvatarURL())
    .setDescription(description)

  message.channel.send(embed);
}

const listBossClaims = async ({ boss, message, bot }) => {
  let claims = await getBosseClaims({ boss: boss.id })

  let description = claims.map(claim => `${claim.index}º :: ${claim.username}`).join('\n')

  console.log(boss)

  let embed = new MessageEmbed()
    .setTitle(boss.name)
    .setColor(boss.color)
    .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
    .setThumbnail(bot.user.displayAvatarURL())
    .setDescription(description)

  message.channel.send(embed);
}

const setBossClaim = async ({ boss, pos, message, bot }) => {
  let claims = await getBosseClaims({ boss: boss.id })

  if (claims.find(e => e.index == pos)) {
    message.reply('Place alredy claimmed!')
    return
  }

  db.collection('bosses').doc(boss.id).collection('claim').doc(pos)
    .set({
      index: pos,
      id: message.author.id,
      username: message.author.username
    }).then(e => {
      message.reply('Done!')
    })
}

const clearBossClaim = async ({ boss, message, bot }) => {
  let claims = await getBosseClaims({ boss: boss.id })

  claims.forEach(claim => {
    db.collection('bosses').doc(boss.id).collection('claim').doc(claim.index).delete()
  })
}

export default async function bosses({ message, bot, args }){
  // message.channel.send(args.join(' ')||'empty')

  let bosses = await getBosses()

  if (!args[0]) {
    listBosses({ bosses, message, bot })
  } else if (bosses.find(e => e.id == args[0])) {
    if (!args[1]) {
      listBossClaims({ boss: bosses.find(e => e.id == args[0]), message, bot })
    } else {
      if (args[1] == 'set') {
        if (args[2] == '1' || args[2] == '2') {
          setBossClaim({ boss: bosses.find(e => e.id == args[0]), pos: args[2], message, bot })
        } else {
          message.reply('Invalid Position, only 1º and 2º')
        }
      } else if (args[1] == 'clear') {
        clearBossClaim({ boss: bosses.find(e => e.id == args[0]), message, bot })
      } else {
        message.reply('Invalid Command Type !help')
      }
    }
  } else {
    message.reply('Invalid Command Type !help')
  }

}