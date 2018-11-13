class Clock {
  constructor(horaId, minutoId, segundoId, diaId, mesId) {
    this.horaDomEl = dom.byId(horaId);
    this.minutoDomEl = dom.byId(minutoId);
    this.segundoDomEl = dom.byId(segundoId);

    this.horaPonteiroDomEl = dom.byId(`${horaId}-ponteiro`);
    this.minutoPonteiroDomEl = dom.byId(`${minutoId}-ponteiro`);

    this.diaDomEl = dom.byId(diaId);
    this.mesDomEl = dom.byId(mesId);
  }

  updateTime() {
    var datetime = tizen.time.getCurrentDateTime(),
      hour = datetime.getHours(),
      minute = datetime.getMinutes(),
      second = datetime.getSeconds();

    rotateElement(this.horaPonteiroDomEl, (hour + (minute / 60) + (second / 3600)) * 30);
    rotateElement(this.minutoPonteiroDomEl, (minute + second / 60) * 6);
  }

  tic() {
    return new Promise((resolve) => {
      var datetime = tizen.time.getCurrentDateTime();
      html(this.horaDomEl, pad(datetime.getHours()));
      html(this.minutoDomEl, pad(datetime.getMinutes()));
      html(this.segundoDomEl, pad(datetime.getSeconds()));
      html(this.diaDomEl, pad(datetime.getDate()));
      html(this.mesDomEl, pad(datetime.getMonth() + 1));

      // this.updateTime();
      
      resolve();
    });
  }
}