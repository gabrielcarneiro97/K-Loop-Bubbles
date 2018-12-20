class Clock {
  constructor(app) {
    this.fontStyle = new PIXI.TextStyle({
      fontFamily: 'Roboto',
      fontSize: 36,
      fill: '#ffffff',
    });

    this.segundo = new PIXI.Text('00', this.fontStyle);
    setCenterPos(center, this.segundo);
    this.minuto = new PIXI.Text('00', this.fontStyle);
    
    this.hora = new PIXI.Text('00', this.fontStyle);

    app.stage.addChild(this.segundo);
  }

  updateTime() {
    const datetime = tizen.time.getCurrentDateTime();

    const hora = datetime.getHours();
    const minuto = datetime.getMinutes();
    const segundo = datetime.getSeconds();

    const dia = datetime.getDate();
    const mes = datetime.getMonth() + 1;

    this.segundo.text = pad(segundo);

  }

  tic() {
    return new Promise((resolve) => {
      this.updateTime();
      
      resolve();
    });
  }
}