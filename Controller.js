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
    this.currentStage = -1;
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

  userInterface() {

    if((this.currentStage === -1)){
      readline.question('Введите Ваше имя: ', (answer) => {
        if (answer === 'exit') {
          console.log('Всего доброго!');
          readline.close();
        } else if(answer) {
          console.log(`Здравствуйте, ${answer}! Давайте поиграем в викторину. Выберете тему: `);
          this.currentStage = 0;
          this.userInterface()          
          }
        }) 
      } 

      if(this.currentStage === 0) {
        readline.question('1.Животные\n2.Птицы\n3.Рыбы\n', (answer) => {
          if(answer === 1 || answer === 2 || answer === 3)
          {this.currentStage = answer}
        })
      }

      if(this.currentStage === 1) {
        readline.question('', (answer) => {
          
        })
      }

      if(this.currentStage === 2) {
        readline.question('', (answer) => {
          
        })
      }

      if(this.currentStage === 3) {
        readline.question('', (answer) => {
          
        })
      }


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

let score = 0;
function allScore (countTaskScore, totalTask) {
  let maxScore = countTaskScore * totalTask;

  this.allScore = this.allScore + countTaskScore;
  if (this.allScore > maxScore) {
    return error;
  }
}
