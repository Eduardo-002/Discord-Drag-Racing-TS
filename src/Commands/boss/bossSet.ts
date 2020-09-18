import { MessageEmbed, Message, Client } from 'discord.js'
import { db } from '../../Services/firebase'
import getBosses from '../helpers/getBosses'
import { Boss } from '../helpers'
import getClaims from '../helpers/getClaims'

export default async function bossSet(message:Message,bot:Client,args:Array<string>) {
  let bosses = await getBosses()

  const chosenBoss:Boss|undefined = bosses.find(e=>e.code==args[0])

  if(chosenBoss){
    let claims = await getClaims(chosenBoss)

    if(claims){
      if(claims.find(e=>e.index==args[2])){
        message.reply('Place alredy claimed!')
        return
      }
      if(claims.find(e=>e.userid==message.author.id)){
        message.reply('You alredy claimmed a place in this boss')
        return
      }
    }

    // make args[2] a number so it can be ordered in the database
    let position:number = parseInt(args[2])

    db.collection('bosses').doc(chosenBoss.id).collection('claims')
      .add({
        index: position,
        username: message.author.username,
        userid: message.author.id
      })
      .then(res=>{
        if(res){
          message.reply(`${args[2]}º position of ${chosenBoss.name} has been claimed`)
        }
      })
  }
}