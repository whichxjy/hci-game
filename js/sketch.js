let video;

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.hide();
}

function draw() {
  image(video, 0, 0);
}
