# Discord bot для отображения онлайна вашего сервера на RageMP
> Для запуска требуется NodeJS 16.8 и выше)

- Скачиваем все файлы и загружаем в отдельную папку на вашем Linux/Windows хостинге

- Для начала вам нужно создать бота на https://discord.com/developers/.

- Далее изменить token в файле **config.json**

- Пригласить бота на сервер(информацию по созданию и приглашению бота найдёте в интернете)

- Заменяете название сервера на своё в файле bot.js - переменная **myServerName** - укажите точное соответствие названия
- Устанавливаете необходимые модули через **npm i**

- Запускаете бота на своём хостинге через **node bot.js** прописывая эту команду в терминале или командной строке

- В своём Discord сервере создаёте категорию с названием `Онлайн:` (Все символы обязательны)

- Бот находит категорию с названием `Онлайн:` и меняет у неё название на `Онлайн: 123/1000`, например