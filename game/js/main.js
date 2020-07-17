let game;

function setup() {
  createCanvas(windowWidth, windowHeight);
  game = new RoundA(() => {
    game = new RoundB();
  });
}

function draw() {
  game.draw();
}
