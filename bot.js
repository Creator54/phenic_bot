import tg from 'telegraf'
import prompt from 'prompt'

prompt.start()
const {TOKEN} = await prompt.get('TOKEN');
const bot = new tg.Telegraf(TOKEN)
const debug = false
const screen = '1920x1080'
const source = 'https://source.unsplash.com/' + screen + '/?'
let query = 'random'

//for invoking start command
bot.command('start', ctx => {
  debug && console.log(ctx)
  ctx.reply(`Welcome to Phenic Bot.\nFind your most lovable wallpaper now 😄`)
  let Message = `Choose wallpaper category :`;
  bot.telegram.sendMessage(ctx.chat.id, Message, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: query,
            callback_data: 'display',
          },
        ]
      ]
    }
  })
})

//fetch wallpaper
bot.action('display', ctx => {
  ctx.deleteMessage();
  ctx.replyWithPhoto({
    url: source + query
  })
  bot.telegram.sendMessage(ctx.chat.id,'More Images ??', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Yes',
            callback_data: 'display',
          },
        ]
      ]
    }
  })
})

bot.launch()
