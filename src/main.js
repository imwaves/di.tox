function $ (s) { return document.querySelector(s) }
function $$ (s) { return [...document.querySelectorAll(s)] }
function px (v) { return `${v}px` }
const logs = [];
function log (...args) {
  console.log(...args)
  logs.push(args);
}

const $doc = document.documentElement;
const $root = document.body;
const $topbar = $('.Topbar');
const $main = $('main');
const $sections = $$('.Main section');

let mainHeight;
function onResize () {
  const { offsetHeight: topbarHeight } = $topbar;
  // const mainHeight = window.outerHeight - topbarHeight;
  // log({mainHeight, topbarHeight})
  $doc.style.setProperty('--topbar-dh', px(topbarHeight));
  // $doc.style.setProperty('--main-h', px(mainHeight));
  $doc.style.setProperty('--main-h', `max(500px, calc(100vh - ${ px(topbarHeight) }))`);
  mainHeight = parseInt(getComputedStyle($doc).height);
}
onResize();
window.addEventListener('resize', onResize);

const scrollAnchors = [, '/#info', '/#team'];
// const scrollMap = new Map();
// scrollMap.set($('#info'), $('a[href="/#info"]'));
// scrollMap.set($('#team'), $('a[href="/#team"]'));

const $links = $$('.Topbar__nav a');
$links.forEach($el => $el.addEventListener('click', e => setTimeout(onMainScroll, 1e3)));

$main.addEventListener('scroll', onMainScroll);
function onMainScroll (e) {
  const { scrollTop } = $main;
  const elHref = scrollAnchors[Math.round(scrollTop / mainHeight)];
  $links.forEach($el => {
    $el.classList.toggle('--active', $el.getAttribute('href') === elHref);
  });
}
setTimeout(onMainScroll, 1e3);

(function Langs () {
  const $langBtns = $$('.Topbar__langs li')
  // const isGeorgian = navigator.language.startsWith('ge');

  const localLang = window.localStorage.getItem('lang');

  log({localLang})
  setLang(localLang || 'ge');

  $langBtns.forEach($btn => {
    $btn.addEventListener('click', e => setLang($btn.dataset.value, true));
  });

  function setLang (lang, userly) {
    document.documentElement.setAttribute('lang', lang);

    if (userly)
      window.localStorage.setItem('lang', lang);
  }
})();

(function Debug () {
  let clicks = 0;
  $$('.debug-btn').forEach($el =>
    $el.addEventListener('click', e => (++clicks > 5) && openDebug())
  );

  function openDebug () {
    let content = logs.map(log => log.map(d => JSON.stringify(d))).join('\n');
    const $el = $('#debug');
    $el.style.display = '';
    $('#logs').textContent = content;
  }
})();