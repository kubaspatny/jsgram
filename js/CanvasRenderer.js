var CanvasRenderer = function(){
  this.canvas = document.querySelector('canvas');
  this.main = document.querySelector('#canvas-wrapper');

  window.addEventListener('resize', this._onResize.bind(this));
}

CanvasRenderer.prototype._onResize = function(){
  console.log("Main resized: " + this.main.clientWidth + "x" + this.main.clientHeight);
}

CanvasRenderer.prototype._fitCanvasToContainer = function() {
  this.canvas.style.width='100%';
  this.canvas.style.height='100%';
  this.canvas.width  = this.canvas.offsetWidth;
  this.canvas.height = this.canvas.offsetHeight;
}
