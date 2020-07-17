function Monster(position, velocity, size, maxForce, maxSpeed) {
  this.position = position;
  this.velocity = velocity;
  this.size = size;
  this.acceleration = createVector(0, 0);
  this.maxForce = maxForce;
  this.maxSpeed = maxSpeed;
  this.dead = false;

  this.follow = (flowField) => {
    const desired = flowField.lookup(this.position);
    desired.mult(maxSpeed);
    const steer = p5.Vector.sub(desired, velocity);
    steer.limit(maxForce);
    this.applyForce(steer);
  };

  this.chase = (player) => {
    const playerPosition = createVector(player.x(), player.y());
    const force = p5.Vector.sub(playerPosition, this.position);
    force.limit(1.5 * maxForce);
    this.applyForce(force);
  };

  this.applyForce = (force) => {
    this.acceleration.add(force);
  };

  this.update = () => {
    if (this.dead) {
      return;
    }

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  };

  this.die = () => {
    this.dead = true;
  };
}