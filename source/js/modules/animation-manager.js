class AnimationStartManager {
  constructor(builder) {

    this._node = builder._node || null;
    this._prevAnimatedNode = builder._prevAnimatedNode || null;
    this._delay = builder._delay || 0;
    this._fpsMediator = builder._mediator || null;

    const {body} = document;
    this._body = body;
    this._launchAnimationClass = `launch-animate`;
  }

  init() {
    if (!this._isNotMobile()) {
      return;
    }

    this.runAnimation();
    this._body.addEventListener(`screenChanged`, (evt) => {
      const {detail} = evt;
      this.reloadAnimation(detail.screenId);
    });
    this._body.addEventListener(`sliderChanged`, (evt) => {
      const {detail} = evt;
      this.reloadAnimation(detail.sliderId);
    });
  }

  _isNotMobile() {
    return window.innerWidth > 768;
  }

  runAnimation() {
    const config = {
      attributes: true,
      characterData: true,
      childList: false,
      subtree: false,
      attributeOldValue: true,
      characterDataOldValue: true,
      attributeFilter: [`class`]
    };

    const onMutate = (mutations) => {
      if (mutations[0].attributeName === `class` && mutations[0].target.classList.contains(`page-onload`)) {
        this._runAnimationThroughTime();
        this._runAnimationAfterAnother();
        observer.disconnect();
      }
    };

    const observer = new MutationObserver(onMutate);
    observer.observe(this._body, config);
  }

  _addClassLaunchAnimation(elem) {
    if (!elem) {
      throw new Error(`Element this._node is missing`);
    }

    elem.classList.add(this._launchAnimationClass);
  }

  _removeClassLaunchAnimation() {
    if (!this._node) {
      throw new Error(`Element this._node is missing`);
    }

    this._node.classList.remove(this._launchAnimationClass);
  }

  _runAnimationThroughTime() {
    if (this._prevAnimatedNode) {
      return;
    }

    setTimeout(this._addClassLaunchAnimation.bind(this, this._node), this._delay);
  }

  _runAnimationAfterAnother() {
    if (this._prevAnimatedNode) {
      this._prevAnimatedNode.addEventListener(
          `animationend`, () => {
            this._addClassLaunchAnimation(this._node);
          }
      );
    }
  }

  _getParentScreenId() {
    if (!this._node) {
      throw new Error(`Element this._node is missing`);
    }

    const screen = this._node.closest(`.screen`);
    const parentScreen = screen.parentNode;
    const parentScreenIndex = Array.from(parentScreen.children).indexOf(screen);

    return parentScreenIndex;
  }

  _isParentScreen() {
    return this._getParentScreenId() === this._fpsMediator.getActiveScreenId();
  }

  reloadAnimation() {
    if (this._getParentScreenId() === this._fpsMediator.getActiveScreenId()) {
      this._removeClassLaunchAnimation();
    }

    this._runAnimationThroughTime();
    this._runAnimationAfterAnother();
  }
}

export default class AnimationStartManagerBuilder {
  constructor(node) {
    this._node = node;
  }

  addPrevAnimatedNode(prevAnimatedNode) {
    this._prevAnimatedNode = prevAnimatedNode;
    return this;
  }

  addDelay(delay) {
    this._delay = delay;
    return this;
  }

  addMediator(mediator) {
    this._mediator = mediator;
    return this;
  }

  build() {
    return new AnimationStartManager(this).init();
  }
}
