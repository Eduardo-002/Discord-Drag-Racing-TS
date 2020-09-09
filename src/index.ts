import { Client } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

import server from './server'
import { prefix,token } from './config'
import handleMessage from './Commands'

let bot = new Client({
  fetchAllMembers: true,
  presence: {
    status: 'online',
    activity: {
      name: `${prefix}help`,
      type: 'LISTENING'
    }
  }
})

bot.on('ready', ()=>{
  console.log(`Logged in as ${bot.user!.tag}.`)
})

bot.on('message', message => {
  handleMessage({message,bot})
})

server()
bot.login(token)