import GlslCanvas from 'GlslCanvas';
import frag0 from './logo-displ.frag.glsl';
import logoSrc from './assets/6dd.png?as=webp';

const $logo = document.querySelector('.logo');
if ($logo.loaded)
  setTimeout(onLogoLoaded, 50);
else
  $logo.addEventListener('load', onLogoLoaded);

function onLogoLoaded () {
  const sizes = { w: null, h: null, k: null };
  function setSizes () {
    sizes.w = window.innerWidth * window.devicePixelRatio;
    sizes.k = $logo.offsetWidth / $logo.offsetHeight;
    sizes.h = sizes.w / sizes.k;
    console.log(sizes);
  }
  setSizes();
  window.addEventListener('resize', setSizes);
  $logo.hidden = true;

  const $canvas0 = document.querySelector('#canvas-0');
  $canvas0.width = sizes.w;
  $canvas0.height = sizes.h;
  $canvas0.hidden = false;

  const glsl0 = new GlslCanvas($canvas0);
  window.glsl0 = glsl0;
  glsl0.load(frag0);
  glsl0.setUniform('sTex', logoSrc);
}
