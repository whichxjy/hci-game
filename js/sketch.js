let video;
let poseNet;
let pose;

function setup() {
  createCanvas(windowWidth, windowHeight);

  video = createCapture(VIDEO);
  video.hide();

  console.log(video.height);

  poseNet = ml5.poseNet(video, { flipHorizontal: true, detectionType: "single" }, () => {
    console.log("poseNet ready");
  });

  poseNet.on("pose", handlePoses);
}

function handlePoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function draw() {
  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0);
  pop();

  if (pose) {
    fill(255, 0, 0);
    ellipse(pose.nose.x, pose.nose.y, 32);
    fill(0, 0, 255);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
  }
}
