class Clock {
  constructor(horaId, minutoId, segundoId, diaId, mesId) {
    this.horaDomEl = dom.byId(horaId);
    this.minutoDomEl = dom.byId(minutoId);
    this.segundoDomEl = dom.byId(segundoId);

    this.bigDomEl = dom.byId('big');
    this.bigBubbles = Array.from(dom.byClass('big bubble'));

    this.medDomEl = dom.byId('med');
    this.medBubbles = Array.from(dom.byClass('med bubble'));

    this.diaDomEl = dom.byId(diaId);
    this.mesDomEl = dom.byId(mesId);
  }

  updateTime() {
    const datetime = tizen.time.getCurrentDateTime();

    const hora = datetime.getHours();
    const minuto = datetime.getMinutes();
    const segundo = datetime.getSeconds();

    const dia = datetime.getDate();
    const mes = datetime.getMonth() + 1;

    html(this.horaDomEl, pad(hora));
    html(this.minutoDomEl, pad(minuto));
    html(this.segundoDomEl, pad(segundo));

    html(this.diaDomEl, pad(dia));
    html(this.mesDomEl, pad(mes));

    const bigRotate = ((hora + (minuto / 60) + (segundo / 3600)) * 30) - 90;
    const bigRotateRev = -(bigRotate);

    const medRotate = ((minuto + segundo / 60) * 6) - 90;
    const medRotateRev = -(medRotate);


    rotateElement(this.bigDomEl, bigRotate);

    this.bigBubbles.forEach(el => rotateElement(el, bigRotateRev));

    rotateElement(this.medDomEl, medRotate);

    this.medBubbles.forEach(el => rotateElement(el, medRotateRev));
  }

  tic() {
    return new Promise((resolve) => {
      this.updateTime();
      
      resolve();
    });
  }
}