function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const settings = {
  colors: ["#2F62B5", "#E3E7EB", "#00CDF7", "#FFDA00", "#FF5231", "#FFFFFF"] };


const utils = {
  getRandFromRange: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  count: function (array) {
    return array.length ?
    array.reduce(function (previous, current) {
      return previous + current;
    }) :
    0;
  } };


class Illustration {







  constructor(selector, colors) {_defineProperty(this, "columnCount", void 0);_defineProperty(this, "rowCount", void 0);_defineProperty(this, "boxSize", void 0);_defineProperty(this, "colors", void 0);_defineProperty(this, "screen", { width: 0, height: 0 });_defineProperty(this, "svg", void 0);
    this.boxes = [];
    this.screen = {
      width: window.innerWidth,
      height: window.innerHeight };


    this.columnCount = Math.floor(this.screen.width / 85);
    this.rowCount = Math.floor(this.screen.height / 85);
    this.boxSize = 50;

    this.setSVG(selector);
    this.colors = colors;

    this.draw();
  }

  setSVG(selector) {
    this.svg = document.querySelector(selector);
    this.svg.addEventListener("click", this.draw.bind(this));
    this.svg.setAttribute(
    "viewBox",
    `0 0 ${this.boxSize * this.columnCount} ${this.boxSize * this.rowCount}`);

    this.svg = this.svg.querySelector("g");
  }

  reset() {
    this.boxes = [];
    this.svg.innerHTML = "";
  }

  draw() {
    this.reset();

    for (let i = 0; i < this.rowCount; i++) {
      for (let j = 0; j < this.columnCount; j++) {
        const bgColor = utils.getRandFromRange(0, this.colors.length - 1);
        let elementColor = utils.getRandFromRange(0, this.colors.length - 1);
        while (elementColor === bgColor) elementColor = utils.getRandFromRange(0, this.colors.length - 1);

        const box = new Box(
        j * this.boxSize,
        i * this.boxSize,
        this.boxSize,
        this.boxSize,
        this.colors[bgColor],
        this.colors[elementColor]);


        this.svg.appendChild(box.getDOMElement());
      }
    }
  }}


class Box {








  constructor(x, y, width, height, bgColor, elementColor) {_defineProperty(this, "x", void 0);_defineProperty(this, "y", void 0);_defineProperty(this, "width", void 0);_defineProperty(this, "height", void 0);_defineProperty(this, "bgColor", void 0);_defineProperty(this, "elementColor", void 0);_defineProperty(this, "element", void 0);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.bgColor = bgColor;
    this.elementColor = elementColor;

    this.hasStripes = Math.random() > 0.5;

    this.rectangle = new Rectangle(x, y, width, height, bgColor);
    this.stripes = this.hasStripes ? new Stripes(x, y, width, height, utils.getRandFromRange(3, 7), utils.getRandFromRange(0, 1), elementColor) : null;

    this.setDOMElement();
  }

  getDOMElement() {
    return this.element;
  }

  setDOMElement() {
    this.element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "g");


    this.element.append(this.rectangle.getDOMElement());
    this.circle ? this.element.append(this.circle.getDOMElement()) : null;
    this.triangle ? this.element.append(this.triangle.getDOMElement()) : null;
    this.stripes ? this.element.append(this.stripes.getDOMElement()) : null;
  }}


class Rectangle {






  constructor(x, y, width, height, fill) {_defineProperty(this, "cx", void 0);_defineProperty(this, "cy", void 0);_defineProperty(this, "r", void 0);_defineProperty(this, "fill", void 0);_defineProperty(this, "element", void 0);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fill = fill;

    this.setDOMElement();
  }

  getDOMElement() {
    return this.element;
  }

  setDOMElement(x, y, width, height, fill) {
    this.element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect");


    this.element.setAttribute("x", x ? x : this.x);
    this.element.setAttribute("y", y ? y : this.y);
    this.element.setAttribute("width", width ? width : this.width);
    this.element.setAttribute("height", height ? height : this.height);
    this.element.style.fill = fill ? fill : this.fill;
  }}


class Stripes {










  constructor(x, y, width, height, count, direction, fill) {_defineProperty(this, "x", void 0);_defineProperty(this, "y", void 0);_defineProperty(this, "width", void 0);_defineProperty(this, "height", void 0);_defineProperty(this, "count", void 0);_defineProperty(this, "direction", void 0);_defineProperty(this, "fill", void 0);_defineProperty(this, "rectangles", void 0);_defineProperty(this, "element", void 0);
    this.x = x;
    this.y = y;
    this.count = count;
    this.direction = direction;
    this.fill = fill;
    this.rectangles = [];

    direction ? this.width = width : this.width = width / (count * 2 - 1);
    direction ? this.height = height / (count * 2 - 1) : this.height = height;

    this.setRectangles();
    this.setDOMElement();
  }

  setRectangles() {
    for (let i = 0; i < this.count; i++) {
      this.rectangles.push(new Rectangle(
      this.direction ? this.x : this.x + 2 * i * this.width,
      this.direction ? this.y + 2 * i * this.height : this.y,
      this.width,
      this.height,
      this.fill));

    }
  }

  getDOMElement() {
    return this.element;
  }

  setDOMElement(x, y, width, height, points, fill) {
    this.element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "g");


    this.rectangles.forEach(rectangle => {
      this.element.append(rectangle.getDOMElement());
    });
  }}


const illustration = new Illustration(
"#illustration",
settings.colors);
