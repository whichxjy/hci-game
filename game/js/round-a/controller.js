function Controller(target, widthScale, heightScale) {
  this.target = target;
  this.widthScale = widthScale;
  this.heightScale = heightScale;
  this.size = 80;

  this.x = () => target.x * widthScale;
  this.y = () => target.y * heightScale;

  this.display = () => {
    push();
    fill(86, 101, 115);
    strokeWeight(4);
    ellipse(this.x(), this.y(), this.size);
    pop();
  };

  this.hit = (monster) => {
    return collidePointCircle(monster.position.x, monster.position.y, this.x(), this.y(), this.size);
  };
}