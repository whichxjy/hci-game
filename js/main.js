let video;
let poseNet;
let pose;

let system;

let widthScale;
let heightScale;

function setup() {
  createCanvas(windowWidth, windowHeight);

  let monsters = [];

  const position = createVector(random(windowWidth), random(windowHeight));
  const velocity = createVector(0, 0);
  const size = 30;
  const maxForce = random(15, 30);
  const maxSpeed = random(15, 30);
  monsters.push(new Monster(position, velocity, size, maxForce, maxSpeed));

  const resolution = 20;
  system = new FlowFieldSystem(monsters, resolution);

  setupPose();
}

function draw() {
  system.run();
  drawPose();
}

function setupPose() {
  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, { flipHorizontal: true, detectionType: "single" }, () => {
    console.log("poseNet ready");

    widthScale = windowWidth / video.width;
    heightScale = windowHeight / video.height;
  });

  poseNet.on("pose", (poses) => {
    if (poses.length > 0) {
      pose = poses[0].pose;
    }
  });
}

function drawPose() {
  push();
  translate(windowWidth, 0);
  scale(-1, 1);
  image(video, 0, 0, windowWidth, windowHeight);
  pop();

  if (pose) {
    const player = new Player(pose.nose, widthScale, heightScale);
    const leftController = new Controller(pose.leftWrist, widthScale, heightScale);
    const rightController = new Controller(pose.rightWrist, widthScale, heightScale);

    player.display();
    leftController.display();
    rightController.display();
  }
}
