function FlowFieldSystem(monsters, resolution) {
  this.monsters = monsters;
  this.flowField = new FlowField(resolution);

  this.run = () => {
    this.update();
    this.display();
  };

  this.update = () => {
    for (let i = 0; i < this.monsters.length; i++) {
      this.monsters[i].follow(this.flowField);
      this.flowField.checkBorders(this.monsters[i]);
      this.monsters[i].update();
    }
  };

  this.display = () => {
    background(255);
    this.flowField.display();

    for (let i = 0; i < this.monsters.length; i++) {
      this.monsters[i].display();
    }
  };
}