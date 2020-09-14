import { MessageEmbed } from 'discord.js'
import { db } from './../../Services/firebase'

export default async function bossSet({message,bot,args}:{message:any,bot:any,args:Array<string>}) {
  message.reply('bossesSet')
}