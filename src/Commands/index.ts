import { prefix } from './../config'
import { Message, Client } from 'discord.js'

const handleMessage = async (message:Message,bot:Client) => {
  if(message.content.startsWith(prefix)){
    let args = message.content.slice(prefix.length).split(' ')
    let command = args.shift()?.toLocaleLowerCase()

    interface Command {
      name: string,
      path: string
    }

    let commands:Array<Command> = [ 
      {name:'ping',     path:'./ping'  }, 
      {name:'bosses',   path:'./bosses'}, 
      {name:'help',     path:'./help'  }
    ]

    let module = commands.find(e=>e.name==command)
    if(module){
      let commandModule = await import(module.path)
      commandModule.default(message,bot,args)
    }else{
      message.reply('Command not Found! For help type !help4')
    }
   

    /*
    let commands = {
      ping: await import('./ping'),
      bosses: await import('./bosses'),
      help: await import('./help')
    }

    let mod = Object.entries(commands).find(e=>e[0]==command)
    mod ? 
      mod[1].default({message,bot,args}) 
      : 
      message.reply('Command not Found! For help type !help')
    */

  }
}

export default handleMessage