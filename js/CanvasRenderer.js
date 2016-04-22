var CanvasRenderer = function(debug){
  this.canvas = document.querySelector('canvas');
  this.main = document.querySelector('#canvas-wrapper');

  if(debug){
    this.main.className += " blue";
  }

  window.addEventListener('resize', this._onResize.bind(this));
  window.addEventListener('load', this._fitCanvasToContainer.bind(this));
}

CanvasRenderer.prototype._onResize = function(){
    this._fitCanvasToContainer();
}

CanvasRenderer.prototype._fitCanvasToContainer = function() {
  console.log('_fitCanvasToContainer');

  var rect = this.canvas.parentNode.getBoundingClientRect();
  this.canvas.width = rect.width;
  this.canvas.height = rect.height;
  console.log('setting canvas size: [' + this.canvas.width + 'x' + this.canvas.height + ']');

  this._redraw();
  // window.requestAnimationFrame(this._fitCanvasToContainer.bind(this));
}

CanvasRenderer.prototype._redraw = function(){
    console.log('_redraw: [' + this.canvas.width + 'x' + this.canvas.height + ']');

    var ctx = this.canvas.getContext("2d");
    img=new Image();
    img.addEventListener('load', this.drawImage.bind(this, img)); // bind - current IE9+ and all modern browsers

    img.src="http://www.blamethemonkey.com/wp-content/uploads/2013/09/Elia-Locardi-Sleeping-Giants-Mt-Bromo-Indonesia-1440-WM-60q.jpg";
}

CanvasRenderer.prototype.drawImage = function(img){
  // var canvas = ctx.canvas;
  var hRatio = this.canvas.width  / img.width;
  var vRatio = this.canvas.height / img.height;
  var ratio  = Math.min (hRatio, vRatio);
  this.offsetX = (this.canvas.width - img.width*ratio) / 2;
  this.offsetY = (this.canvas.height - img.height*ratio) / 2;

  var ctx = this.canvas.getContext("2d");
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  ctx.drawImage(img, 0,0, img.width, img.height, this.offsetX, this.offsetY, img.width*ratio, img.height*ratio);

  this.imageData = ctx.getImageData(this.offsetX, this.offsetY, img.width*ratio, img.height*ratio);
  this.imageData = grayscale(this.imageData);
  ctx.putImageData(this.imageData, this.offsetX, this.offsetY);
}

function grayscale(imageData){
  var data = imageData.data;

  for(var i = 0; i < data.length; i += 4) {
    var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];

    data[i] = brightness;     //R
    data[i + 1] = brightness; //G
    data[i + 2] = brightness; //B
  }

  return data;
}
