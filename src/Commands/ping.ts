import { Message } from "discord.js";

const ping = async (message:Message) => {
  let msg = await message.reply('Pinging...');
  await msg.edit(`PONG! Message round-trip took ${Date.now() - msg.createdTimestamp}ms.`)
}

export default ping