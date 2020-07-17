let game;

function setup() {
  createCanvas(windowWidth, windowHeight);
  game = new RoundA();
}

function draw() {
  game.draw();
}
