import { useEffect } from 'react';
import useCanvas from '../hooks/useCanvas';

import enemy1Src from '../assets/enemy1.webp';
import enemy2Src from '../assets/enemy2.webp';
import enemy3Src from '../assets/enemy3.webp';
import enemy4Src from '../assets/enemy4.webp';

const enemy1Img = new Image();
const enemy2Img = new Image();
const enemy3Img = new Image();
const enemy4Img = new Image();

enemy1Img.src = enemy1Src;
enemy2Img.src = enemy2Src;
enemy3Img.src = enemy3Src;
enemy4Img.src = enemy4Src;

const enemyTypes = [
  {
    img: enemy1Img,
    spriteWidth: 293,
    spriteHeight: 155,
    spriteFrames: 6,
    bound: true,
    move(x, y) {
      return [
        (x + Math.random() * 5 - 2.5),
        (y + Math.random() * 5 - 2.5),
      ];
    },
  },
  {
    img: enemy2Img,
    spriteWidth: 266,
    spriteHeight: 188,
    spriteFrames: 6,
    bound: false,
    move(x, y) {
      return [
        (x),
        (y),
      ];
    },
  },
  {
    img: enemy3Img,
    spriteWidth: 218,
    spriteHeight: 177,
    spriteFrames: 6,
    bound: true,
  },
  {
    img: enemy4Img,
    spriteWidth: 213,
    spriteHeight: 212,
    spriteFrames: 9,
    bound: true,
  },
];

const enemyArr = [];

class Enemy {
  constructor(enemyType, x, y) {
    this.x = x;
    this.y = y;
    this.image = enemyType.img;
    this.spriteWidth = enemyType.spriteWidth;
    this.spriteHeight = enemyType.spriteHeight;
    this.spriteFrames = enemyType.spriteFrames;
    this.bound = enemyType.bound;
    this.move = enemyType.move;
  }

  draw(ctx, frameCount) {
    ctx.drawImage(
      this.image,
      this.spriteWidth * (Math.floor(frameCount / 3) % this.spriteFrames),
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.spriteWidth / 2,
      this.spriteHeight / 2,
    );
  }

  update(ctx) {
    [this.x, this.y] = this.move(this.x, this.y);

    if (this.bound) {
      // Xbounds
      if (this.x > ctx.canvas.width - this.spriteWidth / 2) {
        this.x = ctx.canvas.width - this.spriteWidth / 2;
      } else if (this.x < 0) { this.x = 0; }
      // Ybounds
      if (this.y > ctx.canvas.height - this.spriteHeight / 2) {
        this.y = ctx.canvas.height - this.spriteHeight / 2;
      } else if (this.y < 0) { this.y = 0; }
    } else {
      // xloop
      if (this.x > ctx.canvas.width + 5) {
        this.x = -this.spriteWidth / 2 - 5;
      } else if (this.x < -this.spriteWidth - 5) {
        this.x = ctx.canvas.width + 5;
      }
      // Yloop
      if (this.y > ctx.canvas.height + 5) {
        this.y = -this.spriteHeight / 2 - 5;
      } else if (this.y < -this.spriteHeight - 5) {
        this.y = ctx.canvas.height + 5;
      }
    }
  }
}
const draw = (ctx, frameCount) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  enemyArr.forEach((enemy) => enemy.draw(ctx, frameCount));
  enemyArr.forEach((enemy) => enemy.update(ctx));
};

function NPCMovements() {
  const canvasRef = useCanvas(draw);

  useEffect(() => {
    for (let i = 0; i < 5; i += 1) {
      enemyArr.push(new Enemy(
        enemyTypes[0],
        Math.floor(Math.random() * (canvasRef.current.width - 200)),
        Math.floor(Math.random() * (canvasRef.current.height - 200)),
      ));
    }
    for (let i = 0; i < 5; i += 1) {
      enemyArr.push(new Enemy(
        enemyTypes[1],
        Math.floor(Math.random() * (canvasRef.current.width - 200)),
        Math.floor(Math.random() * (canvasRef.current.height - 200)),
      ));
    }
  }, [draw]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default NPCMovements;
