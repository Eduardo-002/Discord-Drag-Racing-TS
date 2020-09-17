import { Client, Message } from "discord.js";
import clearClaim from "../helpers/clearClaim";
import getBosses from "../helpers/getBosses";
import getClaims from "../helpers/getClaims";

export default async function bossesClearAll(message:Message,bot:Client,args:Array<string>){
  
  let bosses = await getBosses()

  bosses.forEach(async boss => {
    let claims = await getClaims(boss)

    claims.forEach(async claim  => {
      const cleared = await clearClaim(boss,claim)
    })


  })

  message.reply('All bosses are empty!')
}