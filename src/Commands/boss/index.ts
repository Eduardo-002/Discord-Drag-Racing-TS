import { Message, Client } from "discord.js"

export default async function(message:Message,bot:Client,args:Array<string>){
  interface SecondaryCommand {
    name: string,
    path: string,
    args: Array<Array<string>>
  }

  let SecondaryCommands:Array<SecondaryCommand> = [
    {
      name:'list',
      path:'/list',
      args: [] // bosses
    },
    {
      name:'bossesClearAll',
      path:'/bossesClearAll',
      args: [['equal','clear']]
    },
    {
      name:'boss',
      path:'/boss',
      args: [['different']] // bosses [boss-code]
    },
    {
      name:'bossSet',
      path:'/bossSet',
      args: [['different'],['equal','set'],['different']] // bosses [boss-code] set [position]
    },
    {
      name:'bossClear',
      path:'/bossClear',
      args: [['different'],['equal','clear']] // bosses [boss-code] set [position]
    },
    {
      name:'bossClearPosition',
      path:'/bossClearPosition',
      args:[['different'],['equal','clear'],['different']] // bosses [boss-code] clear [position]
    },
  ]

  const verifyArraysArgs = (a:SecondaryCommand,b:Array<string>) => {
    if(a.args.length!=b.length)return false
    if(a.args.length==0)return true
    for(let i=0;i<a.args.length;i++){
      if(a.args[i][0]=='equal'){
        if(a.args[i][1]!=b[i])return false
      }
    }
    return true
  }
  
  let chosenCommand = SecondaryCommands.find(obj=>verifyArraysArgs(obj,args))
  if(chosenCommand){
    let module = await import(process.env.basedir+'/Commands/boss'+chosenCommand.path)
    module.default(message,bot,args)
  }else{
    message.reply('Thats not a command, type-> !help bosses')
  }
  
  /*SecondaryCommands.forEach(async (obj) => {
    //console.log(obj)
    //console.log(verifyArraysArgs(obj,args))
    if(verifyArraysArgs(obj,args)){
      //console.log(1)
      let module = await import(process.env.basedir+'/Commands/bosses'+obj.path)
      module.default(message,bot,args)
    }
  })*/

}