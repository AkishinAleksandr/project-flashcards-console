/* eslint-disable no-undef */
const Controller = require('../Controller');

describe('Проверка базового функционала', () => {
  const Control = new Controller();

  it('расчёт стоимости бала', () => {
    expect(Control.getQuestionValue(10, 100)).toEqual(10);
    expect(Control.getQuestionValue(5, 5)).toEqual(1);
    expect(Control.getQuestionValue(5, 1)).toEqual(0);
    expect(Control.getQuestionValue(5, 0)).toEqual(0);
  });
});
