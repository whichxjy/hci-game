function Player(target, widthScale, heightScale) {
  this.target = target;
  this.widthScale = widthScale;
  this.heightScale = heightScale;

  this.display = () => {
    push();
    fill(255, 0, 0);
    ellipse(target.x * widthScale, target.y * heightScale, 32);
    pop();
  };
}