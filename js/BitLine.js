class BitLine {
  constructor(app, centerPos, height, mainColor, len) {

    const graphics = new PIXI.Graphics();
    this.graphics = graphics;

    this.mainColor = mainColor !== undefined ? mainColor : 0x0010CF;

    this.color = mainColor !== undefined ? mainColor : 0x0010CF;

    this.zeroColor = 0xFFFFFF;

    this.height = height ? height : 10;

    this.halfHeight = this.height / 2;

    this.bitConst = (this.height * 2) + this.halfHeight;

    switch (len) {
      case 1:
        this.bitsPos = {
          '1': { x: this.bitConst, y: this.halfHeight },
        }
        this.width = this.bitConst * 2;
        break;
      case 2:
        this.bitsPos = {
          '2': { x: this.bitConst, y: this.halfHeight },
          '1': { x: this.bitConst * 2, y: this.halfHeight },
        }
        this.width = this.bitConst * 3;
        break;
      case 3:
        this.bitsPos = {
          '4': { x: this.bitConst, y: this.halfHeight },
          '2': { x: this.bitConst * 2, y: this.halfHeight },
          '1': { x: this.bitConst * 3, y: this.halfHeight },
        }
        this.width = this.bitConst * 4;
        break;
      case 4:
        this.bitsPos = {
          '8': { x: this.bitConst, y: this.halfHeight },
          '4': { x: this.bitConst * 2, y: this.halfHeight },
          '2': { x: this.bitConst * 3, y: this.halfHeight },
          '1': { x: this.bitConst * 4, y: this.halfHeight },
        }
        this.width = this.bitConst * 5;
        break;
      case 5:
        this.bitsPos = {
          '16': { x: this.bitConst, y: this.halfHeight },
          '8': { x: this.bitConst * 2, y: this.halfHeight },
          '4': { x: this.bitConst * 3, y: this.halfHeight },
          '2': { x: this.bitConst * 4, y: this.halfHeight },
          '1': { x: this.bitConst * 5, y: this.halfHeight },
        }
        this.width = this.bitConst * 6;
        break;
      case 6:
      default:
        this.bitsPos = {
          '32': { x: this.bitConst, y: this.halfHeight },
          '16': { x: this.bitConst * 2, y: this.halfHeight },
          '8': { x: this.bitConst * 3, y: this.halfHeight },
          '4': { x: this.bitConst * 4, y: this.halfHeight },
          '2': { x: this.bitConst * 5, y: this.halfHeight },
          '1': { x: this.bitConst * 6, y: this.halfHeight },
        }
        this.width = this.bitConst * 7;
        break;
    }

    this.vertix = {
      x: centerPos.x - (this.width / 2),
      y: centerPos.y - (this.height / 2),
    }

    this.texts = {};

    Object.keys(this.bitsPos).forEach((bit) => {
      var style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: this.height + this.halfHeight / 2,
        fill: this.zeroColor,
      });
      const txt = new PIXI.Text(bit, style);

      txt.anchor.set(0.5);

      txt.x = this.bitsPos[bit].x + this.vertix.x;
      txt.y = this.bitsPos[bit].y + this.vertix.y;

      this.texts[bit] = txt;

    });

    app.stage.addChild(graphics);

  }

  drawNum(num, color) {
    this.texts[num].style.fill = this.zeroColor;
    app.stage.addChild(this.texts[num]);
  }

  drawCircle(relativePos, color) {
    this.graphics.beginFill(color);

    const realPos = {
      x: relativePos.x + this.vertix.x,
      y: relativePos.y + this.vertix.y,
    };

    this.graphics.drawCircle(realPos.x, realPos.y, this.height);
  }

  setNum(decNum) {
    this.graphics.clear();
    let str = decNum.toString(2);

    const bools = {};

    Object.keys(this.bitsPos).forEach((bit) => {
      bools[bit] = false;
    });


    switch (str.length) {
      case 6:
        str = str;
        break;
      case 5:
        str = '0' + str;
        break;
      case 4:
        str = '00' + str;
        break;
      case 3:
        str = '000' + str;
        break;
      case 2:
        str = '0000' + str;
        break;
      case 1:
        str = '00000' + str;
        break;
    }

    for (let i = str.length - 1; i >= 0; i--) {
      switch (i) {
        case 5:
          bools['1'] = str.charAt(i) === '1';
          break;
        case 4:
          bools['2'] = str.charAt(i) === '1';
          break;
        case 3:
          bools['4'] = str.charAt(i) === '1';
          break;
        case 2:
          bools['8'] = str.charAt(i) === '1';
          break;
        case 1:
          bools['16'] = str.charAt(i) === '1';
          break;
        case 0:
          bools['32'] = str.charAt(i) === '1';
          break;
      }
    }

    Object.keys(bools).forEach((bit) => {
      if (bools[bit] && this.bitsPos[bit]) {
        this.drawCircle(this.bitsPos[bit], this.color);
        this.drawNum(bit);
      } else if (this.bitsPos[bit]) {
        this.drawCircle(this.bitsPos[bit], this.zeroColor);
        this.drawNum(bit);
      }
    });
  }

  hide() {
    this.color = 0x000000;
    this.zeroColor = 0x000000;
  }

  show() {
    this.color = this.mainColor;
    this.zeroColor = 0xFFFFFF;
  }
}