import tg from 'telegraf'
import prompt from 'prompt'

prompt.start()
const {TOKEN} = await prompt.get('TOKEN');
const bot = new tg.Telegraf(TOKEN)
const debug = false
const url = 'https://source.unsplash.com/'

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
            text: 'random',
            callback_data: 'query',
          },
        ]
      ]
    }
  })
})

//fetch wallpaper
bot.action('query', ctx => {
  ctx.deleteMessage();
  ctx.replyWithPhoto(url + 'random')
  bot.telegram.sendMessage(ctx.chat.id,'More Images ??', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Yes',
            callback_data: 'query',
          },
        ]
      ]
    }
  })
})

bot.launch()
