import AnimatedText from './letters-animation.js';
import animatedContent from './intro-content-animation.js';

export default () => {

  if (window.innerWidth < 768) {
    return;
  }

  const introTitle = document.querySelector(`.js-intro-title`);
  const introDate = document.querySelector(`.js-intro-date`);

  const animatedTitle = new AnimatedText(
      introTitle,
      `intro__title--animated`,
      `letters-row js-intro-title-row`,
      `letters-char js-intro-title-char`);

  const animatedDate = new AnimatedText(
      introDate,
      `intro__date--animated`,
      `letters-row js-intro-date-row`,
      `letters-char js-intro-date-char`,
      2500);

  animatedContent();
};
