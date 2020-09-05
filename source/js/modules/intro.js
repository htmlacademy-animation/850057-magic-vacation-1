import AnimationStartManagerBuilder from './animation-manager.js';
import AnimatedTextCreate from './create-letters-animation-text.js';

export default (mediator) => {

  if (window.innerWidth < 768) {
    return;
  }

  // init letters-animation

  const introTitle = document.querySelector(`.js-intro-title`);
  const introDate = document.querySelector(`.js-intro-date`);
  const introContent = document.querySelector(`.js-intro-content`);

  const animatedTitle = new AnimatedTextCreate(
      introTitle,
      `letters-row js-intro-title-row`,
      `letters-char js-intro-title-char`);
  animatedTitle.init();

  const animatedDate = new AnimatedTextCreate(
      introDate,
      `letters-row js-intro-date-row`,
      `letters-char js-intro-date-char`);
  animatedDate.init();


  // init animation manager

  const introTitleRow = introTitle.querySelectorAll(`.js-intro-title-row`)[1];
  const introTitleChar = introTitleRow.querySelectorAll(`.js-intro-title-char`);

  const asmIntroTitle = (new AnimationStartManagerBuilder(introTitle))
      .addMediator(mediator);
  asmIntroTitle.build();

  const asmIntroDate = (new AnimationStartManagerBuilder(introDate))
      .addDelay(2000)
      .addMediator(mediator);
  asmIntroDate.build();

  const asmIntroContent = (new AnimationStartManagerBuilder(introContent))
      .addDelay(2000)
      .addPrevAnimatedNode(introTitleChar[introTitleChar.length - 1])
      .addMediator(mediator);
  asmIntroContent.build();
};
