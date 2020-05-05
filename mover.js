class Mover {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D(); // random vector (random direction but with a fixed magnitude (=length) of 1px). Here, the direction is what matters
    this.vel.mult(2); // scaling the vector by 5: magnitude (=length)*5
  }

  update() {
    let mouse = createVector(mouseX, mouseY);

    // creating the acceleration
    this.acc = p5.Vector.sub(mouse, this.pos); // the acceleration is the way to get from the position to the mouse location. It's the vector going from the position to the mouse location
    this.acc.setMag(1); // SLIDER // the higher the magnitude is, the stronger is the acceleration, so the stronger will the object move towards the mouse 

    // applying the acceleration to the velocity
    this.vel.add(this.acc); // we are adding acceleration to the velocity (can be seen as "going faster" OR going further in the same amount of time, so our vector is longer and longer everytime)

    // limit the velocity (since everything is cumulative, it could get out of hand otherwise)
    this.vel.limit(3); // SLIDER

    // change the position accordingly to the velocity
    this.pos.add(this.vel);
  }

  show() {
    stroke(255);
    fill(255);
    ellipse(this.pos.x, this.pos.y, 32);
  }
}
