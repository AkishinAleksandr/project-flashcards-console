const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})


class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
  }

  run() {
    // Просим экземпляр класса модели прочитать папку со всеми темами и составить меню.
    // Попутно передаем метод контроллера this.printTopicsController,
    // так как нам нужно отправить сформинованное меню на вывод в экземпляр класса view
    // после того, как завершится асинхронная операция чтения папки
    // Здесь this.printTopicsController — является callback'ом  
    this.model.readTopics(this.printTopicsController)
  }

  printTopicsController(topicsMenu) {
    // Тут нужно попросить экземпляр класса view вывести меню пользователю, 
    // а также дождаться ответа последнего
  }


  userInterface() {
    readline.question('Введите Ваше имя: ', (answer) => {
      if(answer === 'exit') {
        console.log('Всего доброго!');
        readline.close()
      } else {
        console.log(`Здравствуйте, ${answer}!`)
        message()
      }
    })
  }
  
}

module.exports = Controller
