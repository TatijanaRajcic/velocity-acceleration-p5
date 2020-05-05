let movers = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    movers[i] = new Mover(random(width), 200, random(1, 8));
  }
}

function draw() {
  background(0);

  for (let mover of movers) {
    if (mouseIsPressed) {
      let wind = createVector(0.5, 0); // pointing to the right
      mover.applyForce(wind, "green"); // wind
    }
    let gravity = createVector(0, 0.2); // vector that points down

    let weight = p5.Vector.mult(gravity, mover.mass); // two objects, even with different masses, should fall at the same rate. But not for the wind!

    mover.applyForce(weight, "yellow"); // gravity
    mover.friction(); // friction
    mover.update();
    mover.edges();
    mover.show();
  }
}
