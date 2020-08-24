export default class AnimatedText {
  constructor(node, ...options) {
    const [startAnimationClass, rowTextClass, charTextClass, isReadyFn] = options;

    this.DELAY = 20;
    this.MS_IN_SEC = 1000;
    this.DELAY_RATIO = 0.18;
    this._node = node;
    this._rowTextClass = rowTextClass;
    this._charTextClass = charTextClass;
    this._startAnimationClass = startAnimationClass;
    this._isReadyFn = isReadyFn || 600;

    this.init();
  }

  init() {
    this._insertElement();
    this._startAnimation();
    this._stopAnimation();
  }

  _wrapElement(...args) {
    const [element, delay] = args;

    if (delay) {
      return `<span class="${this._charTextClass}" style="${delay}">${element}</span>`;
    }

    return `<span class="${this._rowTextClass}">${element}</span>`;
  }

  _insertElement() {

    if (!this._node) {
      throw new Error(`Element this._node is missing`);
    }

    const rows = this._node.textContent.split(` `);

    let wrappedRows = rows.map((item, j) => {
      const wrappedChars = item.split(``).map((char, index) => {
        if (j === 1) {
          return this._wrapElement(char, `animation-delay: ${this._getDelayAnimation(index, j)}s;`);
        }

        return this._wrapElement(char, `animation-delay: ${this._getDelayAnimation(index)}s;`);
      });

      return wrappedChars.join(``);
    })
    .map((item) => this._wrapElement(item)).join(``);

    this._node.innerHTML = ``;
    this._node.insertAdjacentHTML(`beforeend`, wrappedRows);
  }

  _getDelayAnimation(...args) {
    const [index, secRow] = args;
    let ratio = 0;

    if (index % 3 === 0) {
      ratio = (index + 1) / this.MS_IN_SEC;
    } else {
      ratio = (index - 1) / this.MS_IN_SEC;
    }

    return secRow ? ratio * this.DELAY + this.DELAY_RATIO : ratio * this.DELAY;
  }

  _addManageClassAnimation() {
    if (!this._node) {
      throw new Error(`Element this._node is missing`);
    }

    this._node.classList.add(this._startAnimationClass);
  }

  _startAnimation() {
    new Promise(
        (resolve, reject) => {
          setTimeout(() => {
            const {body} = document;
            const isReadyToAnimate = body.classList.contains(`page-onload`);
            if (isReadyToAnimate) {
              resolve();
            } else {
              const err = new Error(`Class .page-onload on the body is missing`);
              reject(err);
            }
          }, this._isReadyFn);
        })
    .then(() => {
      this._addManageClassAnimation();
    })
    .catch((error) => {
      console.error(error);
    });
  }

  _stopAnimation() {
    if (!this._node) {
      throw new Error(`Element this._node is missing`);
    }

    this._node.classList.remove(this._startAnimationClass);
  }
}
