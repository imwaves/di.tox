function $ (s) { return document.querySelector(s) }
function $$ (s) { return [...document.querySelectorAll(s)] }
function px (v) { return `${v}px` }

const $doc = document.documentElement;
const $root = document.body;
const $topbar = $('.Topbar');
const $main = $('main');
const $sections = $$('.Main section');

let mainHeight;
function onResize () {
  const { offsetHeight: topbarHeight } = $topbar;
  // const mainHeight = window.outerHeight - topbarHeight;
  // console.log({mainHeight, topbarHeight})
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
  const isGeorgian = navigator.language.startsWith('ge');

  setLang(isGeorgian ? 'ge' : 'en');

  $langBtns.forEach($btn => {
    $btn.addEventListener('click', e => setLang($btn.dataset.value));
  });

  function setLang (lang) {
    document.documentElement.setAttribute('lang', lang);

    $langBtns.forEach($btn => {
      if ($btn.classList.contains('--active'))
        $btn.classList.remove('--active');

      if ($btn.dataset.value === lang)
        $btn.classList.add('--active');
    })
  }
})();