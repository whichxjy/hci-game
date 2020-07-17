function FlowFieldSystem(monsters, resolution) {
  this.monsters = monsters;
  this.flowField = new FlowField(resolution);

  this.run = (player) => {
    this.update(player);
    this.display();
  };

  this.update = (player) => {
    for (let i = 0; i < this.monsters.length; i++) {
      this.monsters[i].follow(this.flowField);
      this.monsters[i].chase(player);
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