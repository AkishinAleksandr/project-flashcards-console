const fs = require('fs').promises;
const path = './topics';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.themes = [];
  }

  loadQuest(path) {
    const readFolder = fs.readdir(path, 'utf-8');
    return readFolder.then((data) => {
      return Promise.all(
        data.map((el) => fs.readFile(`${path}/${el}`, 'utf-8'))
      );
    });
  }

 

  run() {
    // Просим экземпляр класса модели прочитать папку со всеми темами и составить меню.
    // Попутно передаем метод контроллера this.printTopicsController,
    // так как нам нужно отправить сформинованное меню на вывод в экземпляр класса view
    // после того, как завершится асинхронная операция чтения папки
    // Здесь this.printTopicsController — является callback'ом
    this.model.readTopics(this.printTopicsController);
  }

  printTopicsController(topicsMenu) {
    // Тут нужно попросить экземпляр класса view вывести меню пользователю,
    // а также дождаться ответа последнего
  }

  getQuestionValue(numberOfQuestions, maxCount) {
    return Math.floor(maxCount / numberOfQuestions);
  }

  readThemesFromFile(path) {
    return this.loadQuest(path)
    .then(result => result.map(el => JSON.parse(el))).then(result => this.themes = result)
  }

}


module.exports = Controller;
