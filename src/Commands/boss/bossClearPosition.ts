import { Client, Message } from "discord.js";
import { Boss, Claim } from '../helpers'
import clearClaim from "../helpers/clearClaim";
import getBosses from "../helpers/getBosses";
import getClaims from "../helpers/getClaims";

export default async function bossClear(message:Message,bot:Client,args:Array<string>){
  let admin = 'Admin'

  let bosses = await getBosses()

  const chosenBoss:Boss|undefined = bosses.find(e=>e.id==args[0])

  if(chosenBoss){
    let claims = await getClaims(chosenBoss)

    const chosenClaim:Claim|undefined = claims.find(e=>e.index==args[2])

    if(chosenClaim){
      if(
        chosenClaim.userid!=message.author.id &&
        message.member?.roles.cache.find(r=>r.name===admin)
      ) {
        message.reply('You can\'t clear a claim that isn\'t yours')
        return
      }
      let cleared = await clearClaim(chosenBoss,chosenClaim)
      if(cleared){
        message.reply(`${chosenClaim.index}º position of ${chosenBoss.name} cleared!`)
      }
    }else{
      message.reply(`${args[2]}º position of ${chosenBoss.name} is empty or invalid`)
    }
  }
}