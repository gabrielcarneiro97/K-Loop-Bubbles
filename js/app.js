const app = new PIXI.Application(360, 360, { antialias: true, backgroundColor: 0xFFFFFF });
document.getElementById('components-main').appendChild(app.view);

const graphics = new PIXI.Graphics();

graphics.lineStyle(0);
graphics.beginFill(0x000000);
graphics.drawCircle(center.x, center.y, 180);
graphics.endFill();

app.stage.addChild(graphics);

const clock = new Clock(app);

function everySec() {
  clock.tic();
}

function everyMin() {

}

function bindEvents() {
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      everySec();
    }
  });
}

function alwaysOnDisplayController() {
  document.addEventListener('ambientmodechanged', (ev) => {
    const { ambientMode } = ev.detail;
    if (ambientMode) {
      aodOn();
    } else {
      aodOff();
    }
  });

  document.addEventListener('timetick', () => {
    everySec();
  });
}

window.onload = () => {
  bindEvents();
  alwaysOnDisplayController();

  setInterval(() => {
    everySec();
  }, 1000);

  everyMin();
  setInterval(() => {
    everyMin();
  }, 60000);
};
