let video;

let widthScale;
let heightScale;

let pose;
let skeleton;

function setup() {
  createCanvas(windowWidth, windowHeight);

  video = createCapture(VIDEO);
  video.hide();

  const poseNet = ml5.poseNet(video, { flipHorizontal: true, detectionType: "single" }, () => {
    console.log("poseNet ready");

    widthScale = windowWidth / video.width;
    heightScale = windowHeight / video.height;
  });

  poseNet.on("pose", (poses) => {
    if (poses.length > 0) {
      pose = poses[0].pose;
      skeleton = poses[0].skeleton;
    }
  });
}

function draw() {
  background(255);

  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0);
  pop();

  if (pose) {
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(0);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }

    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0);
      stroke(255);
      ellipse(x, y, 16, 16);
    }
  }
}