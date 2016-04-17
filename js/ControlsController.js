var ControlsController = function(){
    cropButton = document.querySelector("#crop-button");
    cropButton.addEventListener("click", this._toggleCropControls.bind(this));

    this._cropControls = document.querySelector("#crop-controls");
    this.cropControlsVisible = 0;
}

ControlsController.prototype._toggleCropControls = function () {
    if(this.cropControlsVisible == 0){
      this.cropControlsVisible = 1;
      this._show(this._cropControls);
    } else {
      this.cropControlsVisible = 0;
      this._hide(this._cropControls);
    }
};

ControlsController.prototype._setOnResizeListener = function (listener) {
  this.onResizeListener = listener;
};

ControlsController.prototype._show = function(element){
  element.style.display = 'block';
  this.onResizeListener._onResize();
}

ControlsController.prototype._hide = function(element){
  element.style.display = 'none';
  this.onResizeListener._onResize();
}
