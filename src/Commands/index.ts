import { prefix } from './../config'

const handleMessage = async ({message,bot}:{message:any,bot:any}) => {
  if(message.content.startsWith(prefix)){
    let args:Array<string> = message.content.slice(prefix.length).split(' ')
    //let command:string = args.shift()?.toLocaleLowerCase()
    const command:string = args.shift()?.toLocaleLowerCase() || ''

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

  }
}

export default handleMessage