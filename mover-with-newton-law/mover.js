class Mover {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 16;
  }

  // Law: force = mass * acceleration. In other terms: acceleration = force / mass
  applyForce(force) {
    this.acc.add(force); // adding together all the different forces that apply to our object
  }

  edges() {
    // boucing ball code: when the ball reaches
    if (this.pos.y >= height - this.r) {
      // needs to be > OR equal
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    }
    if (this.pos.x >= width - this.r) {
      // needs to be > OR equal
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }
  }

  update() {
    // applying the acceleration to the velocity
    this.vel.add(this.acc); // we are adding acceleration to the velocity (can be seen as "going faster" OR going further in the same amount of time, so our vector is longer and longer everytime)

    // change the position accordingly to the velocity
    this.pos.add(this.vel);
    this.acc.set(0, 0); // clearing the force out at the end of every animation cycle
  }

  show() {
    stroke(255);
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
