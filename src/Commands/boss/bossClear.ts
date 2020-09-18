import { Client, Message } from "discord.js";
import { Boss, Claim } from '../helpers'
import clearClaim from "../helpers/clearClaim";
import getBosses from "../helpers/getBosses";
import getClaims from "../helpers/getClaims";

export default async function bossClear(message:Message,bot:Client,args:Array<string>){
  let admin = 'Admin'
  let isAdmin = message.member?.roles.cache.find(r=>r.name===admin)?true:false

  if(isAdmin){
    let bosses = await getBosses()

    const chosenBoss:Boss|undefined = bosses.find(e=>e.code==args[0])

    if(chosenBoss){
      let claims = await getClaims(chosenBoss)

      const cleared:boolean = false
      claims.forEach(async e=>{
        const cleared = await clearClaim(chosenBoss,e)
      })

      message.reply(`${chosenBoss.name} is cleared!`)

    }else{
      message.reply('That\'s not a valid boss code')
    }
  }else{
    message.reply(`That command can only be used by ${admin}`)
  }
}