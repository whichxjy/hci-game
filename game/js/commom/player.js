function Player(target, widthScale, heightScale) {
  this.target = target;
  this.widthScale = widthScale;
  this.heightScale = heightScale;
  this.size = 50;
  this.dead = false;

  this.x = () => target.x * widthScale;
  this.y = () => target.y * heightScale;

  this.display = () => {
    push();
    fill(236, 112, 99);
    strokeWeight(4);
    rectMode(CENTER);
    rect(this.x(), this.y(), this.size, this.size);
    pop();
  };
}