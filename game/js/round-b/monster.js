function CharMonster(position, velocity, size, maxForce, maxSpeed, char) {
  Monster.call(this, position, velocity, size, maxForce, maxSpeed);

  this.char = char;

  this.display = () => {
    if (this.dead) {
      return;
    }

    push();

    fill(164, 165, 139);
    rectMode(CENTER);
    rect(this.position.x, this.position.y, this.size, this.size);

    fill(0, 0, 255);
    stroke(200);
    textSize(30);
    textAlign(CENTER, CENTER);
    text(this.char, this.position.x, this.position.y);

    pop();
  };

  this.hit = (player) => {
    const thisTopLeft = createVector(this.position.x - this.size / 2, this.position.y - this.size / 2);
    const playerTopLeft = createVector(player.x() - player.size / 2, player.y() - player.size / 2);

    return collideRectRect(
      thisTopLeft.x, thisTopLeft.y,
      this.size, this.size,
      playerTopLeft.x, playerTopLeft.y,
      player.size, player.size
    );
  };
}