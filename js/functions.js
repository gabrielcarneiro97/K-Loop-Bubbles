const dom = {
  byId: id => document.getElementById(id),
  byClass: cl => document.getElementsByClassName(cl),
};

const center = {
  x: 180,
  y: 180,
};


function html(el, inner) {
  if (!el) return false;

  try {
    el.innerHTML = inner;
    return true;    
  } catch (err) {
    return err;
  }
}

function showElement(el) {
  if (!el) return false;

  try {
    el.style.display = 'unset';
    return true;
  } catch (err) {
    return err;
  }
}

function hideElement(el) {
  if (!el) return false;

  try {
    el.style.display = 'none';
    return true;
  } catch (err) {
    return err;
  }
}

function pad(el) {
  el = el.toString();

  return el.length === 1 ? `0${el}` : el;
}

function rotateElement(el, angle) {
  if (!el || !angle) return false;

  try {
    el.style.transform = `rotate(${angle}deg)`;
    return true;    
  } catch (err) {
    return err;
  }
}

function setCenterPos(pos, obj) {
  if (!obj.height || !obj.width) {
    return;
  } else if (!pos.x || !pos.y) {
    return;
  }

  const realPos = {
    x: pos.x - (obj.width / 2),
    y: pos.y - (obj.height / 2),
  };

  obj.x = realPos.x;
  obj.y = realPos.y;
}

const openWeatherKey = '67793f8e2edddad949ad82665b43655a';

const ktoc = (kelvin) => parseFloat(kelvin) - 273.15;

const aodArr = Array.from(dom.byClass('hide-aod'));

const aodOn = () => aodArr.forEach(el => hideElement(el));

const aodOff = () => aodArr.forEach(el => showElement(el));