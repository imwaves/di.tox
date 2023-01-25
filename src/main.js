function $ (s) { return document.querySelector(s) }
function $$ (s) { return [...document.querySelectorAll(s)] }
function px (v) { return `${v}px` }

const $doc = document.documentElement;
const $root = document.body;
const $topbar = $('.Topbar');
const $main = $('main');

function onResize () {
  const { offsetHeight: topbarHeight } = $topbar;

  $doc.style.setProperty('--topbar-dh', px(topbarHeight));
  $doc.style.setProperty('--main-h', px(window.innerHeight - topbarHeight));
}
onResize();
window.addEventListener('resize', onResize);

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