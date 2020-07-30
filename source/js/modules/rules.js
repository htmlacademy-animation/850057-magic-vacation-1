export default () => {
  const rulesBtn = document.querySelector(`.js-rules-link`);
  const handleRulesDescr = document.querySelector(`.js-rules-last-item .js-rules-descr`);
  handleRulesDescr.addEventListener(`animationend`, () => {
    rulesBtn.classList.add(`rules__link--anim-started`);
  });
  rulesBtn.addEventListener(`animationend`, (evt) => {
    evt.target.classList.remove(`rules__link--anim-started`);
    evt.target.classList.add(`rules__link--anim-ended`);
  });
};
