const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
const fs = require('fs').promises;

const path = './topics';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  loadQuest() {
    const readFolder = fs.readdir(path, 'utf-8');
    console.log(readFolder);
    readFolder.then((data) =>
      Promise.all(data.map((el) => fs.readFile(`${path}/${el}`, 'utf-8')))
    );
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

  userInterface() {
    readline.question('Введите Ваше имя: ', (answer) => {
      if (answer === 'exit') {
        console.log('Всего доброго!');
        readline.close();
      } else {
        console.log(`Здравствуйте, ${answer}!`);
        this.userInterface();
      }
    });
  }

  getQuestionValue(numberOfQuestions, maxCount) {
    return Math.floor(maxCount / numberOfQuestions);
  }
}

module.exports = Controller;

let score = 0;
function allScore (countTaskScore, totalTask) {
  let maxScore = countTaskScore * totalTask;

  this.allScore = this.allScore + countTaskScore;
  if (this.allScore > maxScore) {
    return error;
  }
}
