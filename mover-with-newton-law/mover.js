let mu = 0.1; // coefficient of fraction. Decided arbitrarily. In real life: depends on the material

class Mover {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 16;
    this.mass = m;
    this.r = sqrt(this.mass) * 10; // so that an object twice heavier will have twice the surface (multiplying by 10 so that it's not too small)
  }

  friction() {
    let diff = height - (this.pos.y + this.r);
    if (diff < 1) {
      console.log("friction");
      // 1. Direction of friction
      let friction = this.vel.copy();
      friction.normalize();
      friction.mult(-1);

      // 2. Magnitude of friction
      let normal = this.mass; // Normal force. The normal force is the force that surfaces exert to prevent solid objects from passing through each other. In the case we are on a plane surface, it's easier to calculate
      friction.setMag(mu * normal);
      this.applyForce(friction);
    }
  }

  // Law: force = mass * acceleration. In other terms: acceleration = force / mass
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass); // we need to use the static function (and not force.div(this.mass) ) because otherwise we divide the same vector twice
    this.acc.add(f); // adding together all the different forces that apply to our object
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
