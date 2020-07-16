function FlowField(resolution) {
  this.setup = (resolution) => {
    this.resolution = resolution;
    this.rowNum = Math.round(windowHeight / resolution);
    this.colNum = Math.round(windowWidth / resolution);

    this.field = new Array(this.rowNum);

    for (let i = 0; i < this.rowNum; i++) {
      this.field[i] = new Array(this.colNum);
    }
  };

  this.generate = () => {
    noiseSeed(random(12345));

    const noiseScale = 0.1;

    for (let i = 0; i < this.rowNum; i++) {
      for (let j = 0; j < this.colNum; j++) {
        const theta = map(noise(i * noiseScale, j * noiseScale), 0, 1, 0, TWO_PI);
        this.field[i][j] = createVector(cos(theta), sin(theta));
      }
    }
  };

  this.lookup = (position) => {
    const row = Math.floor(constrain(position.y / this.resolution, 0, this.rowNum - 1));
    const col = Math.floor(constrain(position.x / this.resolution, 0, this.colNum - 1));
    return this.field[row][col];
  };

  this.checkBorders = (monster) => {
    const position = monster.position;
    const size = monster.size;

    if (position.x < -size) {
      position.x = width + size;
    } else if (position.x > width + size) {
      position.x = -size;
    } else if (position.y < -size) {
      position.y = height + size;
    } else if (position.y > height + size) {
      position.y = -size;
    }
  };

  this.display = () => {
    for (let i = 0; i < this.rowNum; i++) {
      for (let j = 0; j < this.colNum; j++) {
        this.drawVector(i, j);
      }
    }
  };

  this.drawVector = (row, col) => {
    stroke(91, 166, 247);
    strokeWeight(4);
    push();
    translate(col * resolution, row * resolution);
    rotate(this.field[row][col].heading());
    const drawScale = 0.9 * resolution;
    const len = this.field[row][col].mag() * drawScale;
    line(0, 0, len, 0);
    line(0, 3, len, 3);
    pop();
  };

  this.setup(resolution);
  this.generate();
}