const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("./config.json")
const token = config.token;

var webscrape = require('webscrape');
var scraper = webscrape.default();

let online = "0/1000"; //не трогать, максимальный онлайн изменится автоматически

let myServerName = config.serverName;//изменить на своё, можно указать часть названия своего сервера

let minutesForUpdate = 1; //количество минут для обновления онлайна в категории

var timer = null;

client.login(token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(client.user.username);
  timer = setInterval(() => {
    UpdateBotName();
  }, 60000 * minutesForUpdate);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
});

client.on("messageCreate", message => {
  // if (message.content === "test") {
  //   let cache = message.guild.channels.cache;
  //   console.log(cache.map((channel) => channel.name).join(","));
  // }

  // if (message.channel.name === "bot") {
  //   let countMessages = 0;
  //   message.channel.messages.fetch().then((messages) => {
  //     countMessages = messages.size;
  //     message.channel.bulkDelete(countMessages).then(() => {
  //       // message.channel.send("Del")
  //     })
  //       .catch(console.error)
  //   });
  // }
})

function UpdateBotName() {
  scrapOnline();
}

async function scrapOnline() {
  const result = await scraper.get('https://cdn.rage.mp/master/');
  const servers = JSON.parse(result.body);
  let server = Object.values(servers).find((el) => el.name.includes(myServerName) === true);
  if (server !== undefined) {
    online = server.players + "/" + server.maxplayers;
    UpdateChannelName(online);
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
}
