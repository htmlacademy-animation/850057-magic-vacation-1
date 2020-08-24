export default () => {

  if (window.innerWidth < 768) {
    return;
  }

  const introTitle = document.querySelector(`.js-intro-title`);
  const introTitleRow = introTitle.querySelectorAll(`.js-intro-title-row`)[1];
  const introTitleChar = introTitleRow.querySelectorAll(`.js-intro-title-char`);
  const introContent = document.querySelector(`.js-intro-content`);

  introTitleChar[introTitleChar.length - 1].addEventListener(
      `animationend`, () => {
        introContent.classList.add(`intro__content--animated`);
      }
  );
};
