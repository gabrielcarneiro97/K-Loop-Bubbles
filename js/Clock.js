class Clock {
  constructor(app) {
    this.segundo = new BitLine(app, { x: center.x, y: 205 }, 15);
    this.minuto = new BitLine(app, { x: center.x, y: 160 }, 15);
    this.hora = new BitLine(app, { x: center.x, y: 115 }, 15);

    this.mes = new BitLine(app, { x: 250, y: 285 }, 10, 0x0010CF, 4);
    this.dia = new BitLine(app, { x: 250, y: 260 }, 10, 0x0010CF, 5);

    this.aod = false;
  }

  updateTime() {
    const datetime = tizen.time.getCurrentDateTime();

    const hora = datetime.getHours();
    const minuto = datetime.getMinutes();
    const segundo = datetime.getSeconds();

    const dia = datetime.getDate();
    const mes = datetime.getMonth() + 1;

    this.minuto.setNum(minuto);
    this.hora.setNum(hora);

    this.segundo.setNum(segundo);

    this.mes.setNum(mes, true);
    this.dia.setNum(dia);

  }

  tic() {
    return new Promise((resolve) => {
      this.updateTime();
      
      resolve();
    });
  }

  setAod(aod) {
    this.aod = aod;

    if (aod) {
      this.segundo.hide();
      this.mes.hide();
      this.dia.hide();
    } else {
      this.segundo.show();
      this.mes.show();
      this.dia.show();
    }
  }
}