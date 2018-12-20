const center = {
  x: 180,
  y: 180,
};

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