class View {
  Dom = {
    canvas: document.getElementById('myCanvas'),
    square: document.getElementById('square'),
    rectangule: document.getElementById('rectangule'),
    circle: document.getElementById('circle'),
    triangule: document.getElementById('figureTriangule'),
    pencil: document.getElementById('line'),
    color: document.getElementById('colorpicker'),
    heart: document.getElementById('heart'),
    textButton: document.getElementById('textButton'),
    textInput: document.getElementById('textInput'),
    clearButton: document.getElementById('clear'),
    image: document.getElementById('image'),
    sizeofpencil: document.getElementById('sizeofpencil'),
    sizeoftext: document.getElementById('sizeoftext'),
    exportButton: document.getElementById('export'),
    optionSelected: ''
  };
  isDrawing = false;
  lastX = 0;
  lastY = 0;
  context = this.Dom.canvas.getContext('2d');
  constructor() {
    this.bindcolor();
    this.bindsquare();
    this.bindrectangule();
    this.bindcircle();
    this.bindpencil();
    this.bindheart();
    this.bindtext();
    this.bindimage();
    this.bindClearCanvas();
    this.bindtriangule();
    this.bindexport();
  }

  bindcanvas = handler => {
    this.optionSelected = handler;
    this.Dom.canvas.addEventListener('click', handler);
  };

  bindcolor = () => {
    this.Dom.color.addEventListener('change', () => {
      this.context.fillStyle = this.Dom.color.value;
    });
  };

  bindsquare = () => {
    this.Dom.square.addEventListener('click', () => {
      this.unbindcanvas();
      this.bindcanvas(this.drawsquare);
    });
  };

  bindrectangule = () => {
    this.Dom.rectangule.addEventListener('click', () => {
      this.unbindcanvas();
      this.bindcanvas(this.drawrectangule);
    });
  };

  bindcircle = () => {
    this.Dom.circle.addEventListener('click', () => {
      this.unbindcanvas();
      this.bindcanvas(this.drawcircle);
    });
  };
  bindtriangule = () => {
    this.Dom.triangule.addEventListener('click', () => {
      this.unbindcanvas();
      this.bindcanvas(this.drawTriangule);
    });
  };

  bindpencil = () => {
    this.Dom.pencil.addEventListener('click', () => {
      this.unbindcanvas();
      this.bindcanvas(this.addEventListenersPencil);
    });
  };

  bindheart = () => {
    this.Dom.heart.addEventListener('click', () => {
      this.unbindcanvas();
      this.bindcanvas(this.drawheart);
    });
  };

  bindtext = () => {
    this.Dom.textButton.addEventListener('click', () => {
      this.unbindcanvas();
      this.bindcanvas(this.drawtext);
    });
  };

  bindimage = () => {
    this.Dom.image.addEventListener('click', () => {
      this.unbindcanvas();
      this.bindcanvas(this.drawImage);
    });
  };

  bindClearCanvas = () => {
    this.Dom.clearButton.addEventListener('click', this.clearCanvas);
  };

  bindexport = () => {
    this.Dom.exportButton.addEventListener('click', this.export);
  };

  unbindcanvas = () => {
    this.removeEventListenerPencil();
    this.Dom.canvas.removeEventListener('click', this.optionSelected);
  };

  drawsquare = event => {
    const positions = this.getCursorPosition(event);
    this.context.fillRect(positions.x, positions.y, 50, 50);
  };

  drawrectangule = event => {
    const positions = this.getCursorPosition(event);
    this.context.fillRect(positions.x, positions.y, 150, 80);
  };

  drawcircle = event => {
    const positions = this.getCursorPosition(event);
    this.context.beginPath();
    this.context.arc(positions.x, positions.y, 50, 0, 2 * Math.PI);
    this.context.fill();
  };

  drawTriangule = event => {
    const positions = this.getCursorPosition(event);
    this.context.beginPath();
    this.context.moveTo(positions.x, positions.y);
    this.context.lineTo(positions.x, 200 + positions.y);
    this.context.lineTo(200 + positions.x, 200 + positions.y);
    this.context.fill();
  };

  drawheart = event => {
    const positions = this.getCursorPosition(event);
    this.context.beginPath();
    this.context.moveTo(positions.x - 75, positions.y + 40);
    this.context.bezierCurveTo(positions.x - 75, positions.y + 37, positions.x - 70, positions.y + 25, positions.x - 50, positions.y + 25);
    this.context.bezierCurveTo(positions.x - 20, positions.y + 25, positions.x - 20, positions.y + 62.5, positions.x - 20, positions.y + 62.5);
    this.context.bezierCurveTo(positions.x - 20, positions.y + 80, positions.x - 40, positions.y + 102, positions.x - 75, positions.y + 120);
    this.context.bezierCurveTo(positions.x - 110, positions.y + 102, positions.x - 130, positions.y + 80, positions.x - 130, positions.y + 62.5);
    this.context.bezierCurveTo(positions.x - 130, positions.y + 62.5, positions.x - 130, positions.y + 25, positions.x - 100, positions.y + 25);
    this.context.bezierCurveTo(positions.x - 85, positions.y + 25, positions.x - 75, positions.y + 37, positions.x - 75, positions.y + 40);
    this.context.stroke();
    this.context.fill();
  };

  drawtext = event => {
    const positions = this.getCursorPosition(event);
    this.context.font = this.Dom.sizeoftext.value + 'px Arial';
    this.context.fillStyle = this.Dom.color.value;
    this.context.fillText(this.Dom.textInput.value, positions.x, positions.y);
  };

  drawImage = event => {
    const positions = this.getCursorPosition(event);
    if (this.Dom.image.files[0]) {
      const reader = new FileReader();
      reader.onload = event => {
        const img = new Image();
        img.addEventListener('load', () => {
          this.context.drawImage(img, positions.x, positions.y);
        });
        img.src = event.target.result;
      };
      reader.readAsDataURL(this.Dom.image.files[0]);
    }
  };

  clearCanvas = () => {
    this.context.clearRect(0, 0, this.Dom.canvas.width, this.Dom.canvas.height);
  };

  export = () => {
    const exp = this.Dom.canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    aexport.setAttribute('href', exp);
  };

  DrawPencil = event => {
    this.context.lineCap = 'round';
    this.context.strokeStyle = this.Dom.color.value;
    this.context.lineWidth = this.Dom.sizeofpencil.value;
    if (!this.isDrawing) return;
    this.context.beginPath();
    this.context.moveTo(this.lastX, this.lastY);
    this.context.lineTo(event.offsetX, event.offsetY);
    this.context.stroke();
    [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
  };

  addEventListenersPencil = () => {
    this.Dom.canvas.addEventListener('mousedown', this.GetFirstPosition);
    this.Dom.canvas.addEventListener('mousemove', this.DrawPencil);
    this.Dom.canvas.addEventListener('mouseup', this.DrawingFalse);
    this.Dom.canvas.addEventListener('mouseout', this.DrawingFalse);
  };

  removeEventListenerPencil = () => {
    this.Dom.canvas.removeEventListener('mousedown', this.GetFirstPosition);
    this.Dom.canvas.removeEventListener('mousemove', this.DrawPencil);
    this.Dom.canvas.removeEventListener('mouseup', this.DrawingFalse);
    this.Dom.canvas.removeEventListener('mouseout', this.DrawingFalse);
  };
  GetFirstPosition = event => {
    this.isDrawing = true;
    [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
  };

  DrawingFalse = () => (this.isDrawing = false);

  getCursorPosition(event) {
    const rect = this.Dom.canvas.getBoundingClientRect();
    const canvasx = event.clientX - rect.left;
    const canvasy = event.clientY - rect.top;
    return { x: canvasx, y: canvasy };
  }
}
