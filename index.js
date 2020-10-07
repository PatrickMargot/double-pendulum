const canvas = document.getElementById('canvas');

// setting the width and height of the canvas, so that it fills the screen
const canvasW = document.body.clientWidth;
const canvasH = document.body.clientHeight;
canvas.width = canvasW;
canvas.height = canvasH;

const ctx = canvas.getContext('2d');

// transforming the canvas, so that the y axis goes from bottom to top
// and centering the origin 
ctx.transform(1, 0, 0, -1, canvasW / 2, canvasH / 2);

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
};

const doublePendulums = [];
const doublePendulumsCount = 10;
const framesPerSecond = 120;
const initA1 = 2 * Math.PI * getRandomNumber(0.35, 0.65);
const initA2 = 2 * Math.PI * getRandomNumber(0.35, 0.65);

// creating double pendulums
for (let i = 0; i < doublePendulumsCount; i++) {

  const doublePendulum = new DoublePendulum({
    fixPointX: 0,
    fixPointY: 0,
    r1: 150,
    m1: 1,
    a1: initA1,
    r2: 150,
    m2: 0.5,
    
    // tiny changes of the beginning angle of the second pendulum to stimulate CHAOS!
    a2: initA2 + i * 0.02,
    g: 0.05,
    ctx,
    color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
  });

  doublePendulums.push(doublePendulum);

}

let drawOnlyLastCircle = false;

setTimeout(() => drawOnlyLastCircle = true, 7000);

setInterval(() => {

  // clear canvas
  ctx.fillStyle = 'black';
  ctx.fillRect(-canvas.width / 2, canvas.height / 2, canvas.width, -canvas.height);

  // calculating the coordinates and drawing the double pendulums
  doublePendulums.forEach(doublePendulum => {
    doublePendulum.calculate();
    doublePendulum.draw(drawOnlyLastCircle);
  })

}, 1000 / framesPerSecond);
