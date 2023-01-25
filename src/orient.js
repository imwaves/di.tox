document.body.addEventListener('click', initDeviceOrientation);
function initDeviceOrientation () {
  if (DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) {
    DeviceOrientationEvent.requestPermission();
  }
}

let lastOrient = {};
defineSmoothProp(lastOrient, 'alpha', 0, 30);
defineSmoothProp(lastOrient, 'beta', 0, 30);
defineSmoothProp(lastOrient, 'gamma', 0, 30);

let diff = {};
defineSmoothProp(diff, 'alpha', 0, 5);
defineSmoothProp(diff, 'beta', 0, 5);
defineSmoothProp(diff, 'gamma', 0, 5);

window.addEventListener('deviceorientation', e => {
  let alpha = e.alpha;
  if (alpha > 180)
    alpha = -360 + alpha;

  const current = {
    alpha: alpha * -1,
    beta: e.beta,
    gamma: e.gamma,
  };

  if (lastOrient.alpha !== 0) {
    const { PI, abs } = Math;

    Object.assign(diff, {
      alpha: ((current.alpha - lastOrient.alpha) / (PI * 32))/*.toFixed(2)*/,
      beta: ((current.beta - lastOrient.beta) / (PI * 32))/*.toFixed(2)*/,
      gamma: ((current.gamma - lastOrient.gamma) / (PI * 32))/*.toFixed(2)*/,
    });

    // const transform = `rotate3d(${diff.alpha}, ${diff.beta}, ${diff.gamma}, 3.1415rad)`;
    // document.querySelector('#debug span').textContent = `${diff.alpha} | ${diff.beta} | ${diff.gamma}`;
    // const transform = `rotate3d(${diff.alpha}, ${0}, ${PI}, ${Math.PI}rad)`;
    const scale = `scale(${ 1 + abs(diff.beta) + abs(diff.gamma) })`;
    const rotate = `rotateX(${ diff.beta }rad) rotateY(${ -diff.gamma }rad)`;
    const transform = [rotate, scale].join(' ');
    document.body.style.transform = transform;
    Object.assign(lastOrient, current);
  } else
    Object.assign(lastOrient, current);
});

function smooth (val, asp = 30) {
  return function _smooth (v = val) {
    return val -= (val - v) / asp;
  }
}

function defineSmoothProp (obj, prop, value, k) {
  const smoo = smooth(value, k);
  Object.defineProperty(obj, prop, {
    get () { return value },
    set (v) {
      return (value = smoo(v));
    },
  });
}