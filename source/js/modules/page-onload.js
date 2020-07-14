export default () => {
    const checkPageLoad = () => {
        let wrapper = document.body;
        wrapper.classList.add(`page-onload`);
    };

    window.addEventListener(`load`, checkPageLoad);
}

