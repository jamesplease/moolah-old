export default {
  disableScroll() {
    const htmlEl = document.querySelector('html');
    const body = document.body;

    // `window.innerHeight` is the height of the viewport
    // `body.clientHeight` is the height of the document
    // If the document fits in the window, then the document
    // cannot be scrolled, and we don't need to do anything.
    if (window.innerHeight >= body.clientHeight) {
      return;
    }

    const bodyScrollTop = body.scrollTop;
    const htmlScrollTop = htmlEl.scrollTop;
    let scrollTop = bodyScrollTop ? bodyScrollTop : htmlScrollTop;

    htmlEl.style.top = `-${scrollTop}px`;
    htmlEl.classList.add('noscroll');
  },

  enableScroll() {
    const htmlEl = document.querySelector('html');
    const body = document.body;
    const scrollTop = -parseInt(htmlEl.style.top);
    htmlEl.classList.remove('noscroll');
    htmlEl.scrollTop = scrollTop;
    body.scrollTop = scrollTop;
  }
};
