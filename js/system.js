function FlowFieldSystem(resolution) {
  this.flowField = new FlowField(resolution);

  this.run = () => {
    this.update();
    this.display();
  };

  this.update = () => {

  };

  this.display = () => {
    background(255);
    this.flowField.display();
  };
}