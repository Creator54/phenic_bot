import tg from 'telegraf'

const bot = new tg.Telegraf(process.argv[2])
const debug = false
const screen = '1920x1080'
const source = 'https://source.unsplash.com/' + screen + '/?'
let query = 'random'

//for invoking start command
bot.command('start', ctx => {
  debug && console.log(ctx)
  ctx.reply(`Welcome to Phenic Bot.\nFind your most lovable wallpaper now 😄`)
  bot.telegram.sendMessage(ctx.chat.id, `Choose wallpaper category :`, {
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
bot.action('display', async ctx => {
  ctx.deleteMessage();
  await ctx.replyWithPhoto({
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
