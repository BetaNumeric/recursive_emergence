let videos = [];
let numVideos = 3;
let spacePressed = false;
let bPressed = false;
let shiftPressed = false;
let frameVisible = false;

class VideoInstance {
  constructor() {
    this.video = createCapture(VIDEO);
    this.video.size(320, 240);
    this.video.hide();

    this.position = createVector(random(width), random(height));
    this.rotation = 0;
    this.scaleValue = 1;
    this.dragging = false;
    this.dragOffset = createVector(0, 0);
  }

  draw() {
    push();
    translate(this.position.x + this.video.width / 2, this.position.y + this.video.height / 2);
    scale(this.scaleValue);
    rotate(this.rotation);
    image(this.video, -this.video.width / 2, -this.video.height / 2);

    if (frameVisible) {
      strokeWeight(0.5);
      stroke(255, 0, 0); // red frame
      noFill();
      rect(-this.video.width / 2, -this.video.height / 2, this.video.width, this.video.height);
    }

    pop();
  }

  checkPressed() {
    if (dist(mouseX, mouseY, this.position.x + this.video.width / 2, this.position.y + this.video.height / 2) < this.video.width / 2) {
      this.dragging = true;
      this.dragOffset.x = mouseX - this.position.x;
      this.dragOffset.y = mouseY - this.position.y;
    }
  }

  move() {
    if (this.dragging) {
      this.position.x = mouseX - this.dragOffset.x;
      this.position.y = mouseY - this.dragOffset.y;
    }
  }

  stopDragging() {
    this.dragging = false;
  }

  scroll(event) {
    if (this.dragging) {
      if (shiftPressed) {
        this.scaleValue += event.delta / 2000.0;
      } else {
        this.rotation += event.delta / 2000.0;
      }
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numVideos; i++) {
    videos.push(new VideoInstance());
  }
}

function draw() {
  background(spacePressed ? color(0, 128, 128) : 0);

  blendMode(SCREEN);

  for (let video of videos) {
    video.draw();
  }

  blendMode(BLEND);


  if (bPressed) {
    background(0, 40);
  }
}

function mousePressed() {
  for (let video of videos) {
    video.checkPressed();
  }
}

function mouseDragged() {
  for (let video of videos) {
    video.move();
  }
}

function mouseReleased() {
  for (let video of videos) {
    video.stopDragging();
  }
}

function mouseWheel(event) {
  for (let video of videos) {
    video.scroll(event);
  }
}

function keyPressed() {
  if (keyCode === 70) { // 70 is the key code for F
    frameVisible = true;
  }
  if (keyCode === 32) {  // 32 is the key code for SPACE
    spacePressed = true;
  } else if (keyCode === 66) {
    bPressed = true;
  } else if (keyCode === SHIFT) {
    shiftPressed = true;
  }
}

function keyReleased() {
  if (keyCode === 70) {
    frameVisible = false;
  }
  if (keyCode === 32) {
    spacePressed = false;
  } else if (keyCode === 66) {
    bPressed = false;
  } else if (keyCode === SHIFT) {
    shiftPressed = false;
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
