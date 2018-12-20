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
    clock.setAod(ambientMode);
  });

  document.addEventListener('timetick', () => {
    everySec();
  });
}

window.onload = () => {
  bindEvents();
  alwaysOnDisplayController();

  everySec();
  setInterval(() => {
    everySec();
  }, 1000);

};