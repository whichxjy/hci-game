function TriMonster(position, velocity, size, maxForce, maxSpeed) {
  Monster.call(this, position, velocity, size, maxForce, maxSpeed);

  this.display = () => {
    if (this.dead) {
      return;
    }

    const theta = this.velocity.heading();
    push();
    fill(164, 165, 139);
    stroke(0);
    strokeWeight(4);
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape(TRIANGLES);
    vertex(this.size / 2, 0);
    vertex(-this.size / 2, this.size / 3);
    vertex(-this.size / 2, -this.size / 3);
    endShape();
    pop();
  };

  this.hit = (player) => {
    const playerTopLeft = createVector(player.x() - player.size / 2, player.y() - player.size / 2);
    const playerBottomRight = createVector(player.x() + player.size / 2, player.y() + player.size / 2);
    return collidePointRect(
      this.position.x, this.position.y,
      playerTopLeft.x, playerTopLeft.y,
      playerBottomRight.x, playerBottomRight.y
    );
  };
}