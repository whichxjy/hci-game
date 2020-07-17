function Player(target, widthScale, heightScale) {
  this.target = target;
  this.widthScale = widthScale;
  this.heightScale = heightScale;
  this.size = 40;

  this.x = () => target.x * widthScale;
  this.y = () => target.y * heightScale;

  this.display = () => {
    push();
    fill(255, 0, 0);
    ellipse(this.x(), this.y(), this.size);
    pop();
  };
}