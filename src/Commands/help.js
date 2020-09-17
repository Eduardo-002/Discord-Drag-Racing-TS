const commands = {
  'help': {
    description: 'Shows the list of commands or help on specified command ( !help [command name] ).',
    format: 'help [command-name]',
    variations: [
      {
        format: 'help',
        description: 'Lists all commands'
      },
      {
        format: 'help [command-name]',
        description: 'Lists specified command'
      }
    ]
  },
  'bosses': {
    description: 'Used to manage the weakly bosses',
    format: 'bosses [boss-code] [set or clear] [position]',
    variations: [
      {
        format: 'bosses',
        description: 'Lists all the bosses and corresponding codes'
      },
      {
        format: 'bosses order !!! NOT READY !!!',
        description: 'List the order to beat the bosses'
      },
      {
        format: 'bosses order next !!! NOT READY !!!',
        description: 'Advance the list by 1 position'
      },
      {
        format: 'bosses order set [boss-code] [position] !!! NOT READY !!!',
        description: 'Used to set a boss to a position'
      },
      {
        format: 'bosses order clear [position] !!! NOT READY !!!',
        description: 'Used to remove some boss from list'
      },
      {
        format: 'bosses [boss-code]',
        description: 'Lists the Reserved Places'
      },
      {
        format: 'bosses [boss-code] set [position]',
        description: 'Sets the user position to the defined boss'
      },
      {
        format: 'bosses clear',
        description: 'Used when the week ends'
      },
      {
        format: 'bosses [boss-code] clear',
        description: 'Used when the boss os dead'
      },
      {
        format: 'bosses [boss-code] clear [position]',
        description: 'Used to clean some mistake'
      }
    ]
  }/*,
  'mycarset': {
    description: 'Used to set your car stats',
    format: 'mycarset [property] [value]'
  },
  'usercar': {
    description: 'Used to get other users car stats',
    format: 'usercar [username] [property]'
  }*/
}

//const config = require('./../config')
import * as config from './../config'

export default async function help(message,bot,args){

  if(!args[0]){
    displayHelpMenu({message})
  }else{
    displayCommandHelpMenu({message,command:args[0]})
  }

}

const displayHelpMenu = ({message}) => {  
  let embed = {
    title: 'HELP MENU',
    color: 'YELLOW',
    footer: {
      text: `Requested by: ${message.author.username}`,
      icon_url: message.author.displayAvatarURL()
    },
    fields: Object.entries(commands).map(command => {
      return {
        name: config.prefix+command[0],
        value: command[1].description
      }
    })
  }

  embed.fields = Object.entries(commands).map(command => {
    return {
      name: config.prefix+command[0],
      value: command[1].description
    }
  })

  message.channel.send({embed});
}

const displayCommandHelpMenu = ({message,command}) => {
  let embed = {
    title: 'MENU ' + config.prefix+command,
    color: 'YELLOW',
    footer: {
      text: `Requested by: ${message.author.username}`,
      icon_url: message.author.displayAvatarURL()
    },
    description: commands[command].description,
    fields: commands[command].variations.map(variation=>{
      return {
        name: config.prefix+variation.format,
        value: variation.description
      }
    })
  }

  message.channel.send({embed});
}