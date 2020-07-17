function Controller(target, widthScale, heightScale) {
  this.target = target;
  this.widthScale = widthScale;
  this.heightScale = heightScale;

  this.display = () => {
    fill(0, 0, 255);
    ellipse(target.x * widthScale, target.y * heightScale, 32);
  };
}