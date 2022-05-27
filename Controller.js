const readline = require('readline').createInterface({
  input: process.stdin, output: process.stdout,
});
const fs = require('fs').promises;

const path = './topics';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.currentStage = -1;
    this.themes = [];
    this.score = 0;
    this.themeCountQuestion = 0;
    this.maxScore = 100;
  }

  loadQuest(path) {
    const readFolder = fs.readdir(path, 'utf-8');
    return readFolder
      .then((data) => Promise
        .all(data.map((el) => fs.readFile(`${path}/${el}`, 'utf-8'))));
  }

  run() {
    // Просим экземпляр класса модели прочитать папку со всеми темами и составить меню.
    // Попутно передаем метод контроллера this.printTopicsController,
    // так как нам нужно отправить сформинованное меню на вывод в экземпляр класса view
    // после того, как завершится асинхронная операция чтения папки
    // Здесь this.printTopicsController — является callback'ом
    // this.model.readTopics(this.printTopicsController);

    this.readThemesFromFile(path).then((data) => {
      this.themeCountQuestion = data.length;
      this.userInterface();
    });
  }

  printTopicsController(topicsMenu) {
    // Тут нужно попросить экземпляр класса view вывести меню пользователю,
    // а также дождаться ответа последнего
  }

  getArrQuestbyTheme(chosenThemeNumber) {
    return this.themes[chosenThemeNumber - 1];
  }

  askCurrentQuestion(arrRemainQuesh) {
    const objQuestion = arrRemainQuesh.shift();
    const { question, answer } = objQuestion;

    readline.question(`${question} Ответ: `, (readedIn) => {
      if (readedIn === answer) {
        this.allScore(this.getQuestionValue(this.themeCountQuestion, this.maxScore), this.maxScore);
      }
      if (arrRemainQuesh.length === 1) {
        console.log(`Вы заработали ${this.score} из ${this.maxScore} возможных`);
        readline.close();
        return;
      }
      this.askCurrentQuestion(arrRemainQuesh);
    });
  }

  userInterface() {
    if ((this.currentStage === -1)) {
      readline.question('Введите Ваше имя: ', (answer) => {
        if (answer === 'exit') {
          console.log('Всего доброго!');
          readline.close();
        } else if (answer) {
          console.log(`Здравствуйте, ${answer}! Давайте поиграем в викторину. Выберете тему: `);
          this.currentStage = 0;
          this.userInterface();
        }
      });
    }

    if (this.currentStage === 0) {
      readline.question('1.Ястребы\n2.Выдры\n3.Еноты\n', (answer) => {
        this.askCurrentQuestion(this.getArrQuestbyTheme(Number(answer)));
      });
    }
  }

  getQuestionValue(numberOfQuestions, maxCount) {
    return Math.floor(maxCount / numberOfQuestions);
  }

  readThemesFromFile(path) {
    return this.loadQuest(path)
      .then((result) => result.map((el) => JSON.parse(el)))
      .then((result) => this.themes = result);
  }

  allScore(countTaskScore, totalTask) {
    const maxScore = countTaskScore * totalTask;

    this.score += countTaskScore;
    if (this.score > maxScore) {
      return console.log(this.score);
    }
  }
}

module.exports = Controller;
