let game;

function setup() {
  createCanvas(windowWidth, windowHeight);
  game = new RoundB();
}

function draw() {
  game.draw();
}
