const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("./config.json")
const token = config.token;
var webscrape = require('webscrape');
var scraper = webscrape.default();
let online = "0/1000"; //не трогать, максимальный онлайн изменится автоматически
let myServerName = config.serverName;//изменить на своё, можно указать часть названия своего сервера
let minutesForUpdate = config.timerDelayInMinutes; //количество минут для обновления онлайна в категории
var timer = null;
client.login(token);
client.on('ready', () => {
  console.log("Бот запущен и приступил к обновлению онлайна")
  client.user.setUsername(myServerName);
  timer = setInterval(() => {
    scrapOnline();
  }, 60000 * minutesForUpdate);
});
async function scrapOnline() {
  const result = await scraper.get('https://cdn.rage.mp/master/');
  const servers = JSON.parse(result.body);
  let server = Object.values(servers).find((el) => el.name.includes(myServerName) === true);
  if (server !== undefined) {
    online = server.players + "/" + server.maxplayers;
    UpdateChannelName(online);
  } else {
    console.log("Сервер не найден в мастер листе RageMP")
  }
}
function UpdateChannelName(tempOnline = "0/1000") {
  let cache = client.channels.cache;
  let channelElement = cache.find((el) => new String(el.name).toLowerCase().includes("онлайн:") === true);
  if (channelElement === undefined) {
    return console.log("Категория не найдена. Проверьте название категории");
  }
  const channel = client.channels.cache.get(channelElement.id);
  if (!channel) return console.error("Канал или Категория не найдены");
  channel.setName("Онлайн: " + tempOnline)
  let date = new Date();
  console.log(date.getHours() + ":" + date.getMinutes() + " | " + "Текущий онлайн: " + tempOnline);
  client.user.setPresence({
    activities: [{ name: myServerName + " | RageMP" + " - " + tempOnline }],
    status: 'online',
  })
}