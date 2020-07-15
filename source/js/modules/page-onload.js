export default () => {
  const onPageLoad = () => {
    const {body} = document;
    body.classList.add(`page-onload`);
  };

  window.addEventListener(`load`, onPageLoad);
};

