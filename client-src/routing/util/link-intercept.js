export default function(cb) {
  window.onclick = function(e) {
    if (e.target.localName !== 'a') { return; }
    if (e.target.href === undefined) { return; }

    // Setting `data-bypass` on a link causes it to be ignored
    if (e.target.dataset.bypass) { return; }

    if (window.location.host !== e.target.host) { return; }

    const href = e.target.href.replace(/#$/, '');
    e.preventDefault();
    cb(href);
    window.history.pushState({}, null, href);
  };
}
