function CharMonster(position, velocity, size, maxForce, maxSpeed) {
  Monster.call(this, position, velocity, size, maxForce, maxSpeed);

  this.display = () => {
    if (this.dead) {
      return;
    }

    push();
    fill(164, 165, 139);
    strokeWeight(2);
    rectMode(CENTER);
    rect(this.x(), this.y(), this.size, this.size);
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