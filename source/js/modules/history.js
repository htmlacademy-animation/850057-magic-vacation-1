import AnimationStartManagerBuilder from './animation-manager.js';
import AnimatedTextCreate from './create-letters-animation-text.js';

export default (mediator) => {

  if (window.innerWidth < 768) {
    return;
  }

  // init letters-animation

  const sliderTitle = document.querySelector(`.js-slider-item-title`);

  const animatedSliderTitle = new AnimatedTextCreate(
      sliderTitle,
      `letters-row`,
      `letters-char`);
  animatedSliderTitle.init();

  // init animation manager

  const sliderCntrl = document.querySelector(`.js-slider-controls`);
  const parentSliderTitle = sliderTitle.parentNode;
  const sliderText = parentSliderTitle.querySelector(`.js-slider-item-text`);
  const sliderTitleChars = sliderTitle.querySelectorAll(`.letters-char`);
  const sliderTitleLastChar = sliderTitleChars[sliderTitleChars.length - 1];

  const asmHistorySliderCntrl = (new AnimationStartManagerBuilder(sliderCntrl))
      .addMediator(mediator)
      .addDelay(650);
  asmHistorySliderCntrl.build();

  const asmHistorySliderTitle = (new AnimationStartManagerBuilder(sliderTitle))
      .addMediator(mediator);
  asmHistorySliderTitle.build();

  const asmHistorySliderText = (new AnimationStartManagerBuilder(sliderText))
      .addMediator(mediator)
      .addPrevAnimatedNode(sliderTitleLastChar);
  asmHistorySliderText.build();

};
