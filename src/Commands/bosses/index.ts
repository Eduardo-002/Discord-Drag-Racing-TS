export default async function({message,bot,args}:{message:any,bot:object,args:Array<string>}){
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
      name:'boss',
      path:'/boss',
      args: [['different']] // bosses [boss-code]
    },
    {
      name:'bossSet',
      path:'/bossSet',
      args: [['different'],['equal','set'],['different']] // bosses [boss-code] set [position]
    }
  ]

  const verifyArraysArgs = (a:any,b:any) => {
    if(a.args.length!=b.length)return false
    if(a.args.length==0)return true
    for(let i=0;i<a.args.length;i++){
      if(a.args[i][0]=='equal'){
        if(a.args[i][1]!=b[i])return false
      }
    }
    return true
  }
  

  SecondaryCommands.forEach(async (obj) => {
    //console.log(obj)
    //console.log(verifyArraysArgs(obj,args))
    if(verifyArraysArgs(obj,args)){
      //console.log(1)
      let module = await import(process.env.basedir+'/Commands/bosses'+obj.path)
      module.default({message,bot,args})
    }
  })

}