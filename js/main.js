let video;
let poseNet;
let pose;

let system;

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
}

function draw() {
  system.run();
}

function setupPose() {
  video = createCapture(VIDEO);
  video.hide();

  console.log(video.height);

  poseNet = ml5.poseNet(video, { flipHorizontal: true, detectionType: "single" }, () => {
    console.log("poseNet ready");
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

  const widthScale = windowWidth / video.width;
  const heightScale = windowHeight / video.height;

  if (pose) {
    fill(255, 0, 0);
    ellipse(pose.nose.x * widthScale, pose.nose.y * heightScale, 32);
    fill(0, 0, 255);
    ellipse(pose.leftWrist.x * widthScale, pose.leftWrist.y * heightScale, 32);
    ellipse(pose.rightWrist.x * widthScale, pose.rightWrist.y * heightScale, 32);
  }
}
