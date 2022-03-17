import { useRef } from 'react';
import useCanvas from '../hooks/useCanvas';

import layer1Src from '../assets/layer-1.webp';
import layer2Src from '../assets/layer-2.webp';
import layer3Src from '../assets/layer-3.webp';
import layer4Src from '../assets/layer-4.webp';
import layer5Src from '../assets/layer-5.webp';

const layer1Img = new Image();
layer1Img.src = layer1Src;
const layer2Img = new Image();
layer2Img.src = layer2Src;
const layer3Img = new Image();
layer3Img.src = layer3Src;
const layer4Img = new Image();
layer4Img.src = layer4Src;
const layer5Img = new Image();
layer5Img.src = layer5Src;

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 720;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = this.speedModifier;
  }

  update(speed) {
    this.speed = speed * this.speedModifier;
    this.x = (this.x - this.speed) % this.width;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x + this.width - 1, this.y, this.width, this.height);
  }
}

const layer1 = new Layer(layer1Img, 0.2);
const layer2 = new Layer(layer2Img, 0.4);
const layer3 = new Layer(layer3Img, 0.6);
const layer4 = new Layer(layer4Img, 0.8);
const layer5 = new Layer(layer5Img, 1);

const layers = [layer1, layer2, layer3, layer4, layer5];

function Parallax() {
  const speedRef = useRef(0.5);
  const draw = (ctx) => {
    const speed = speedRef.current.valueAsNumber;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    layers.forEach((layer) => {
      layer.update(speed);
      layer.draw(ctx);
    });
  };
  const canvasRef = useCanvas(draw);
  return (
    <div className="flex flex-col justify-center">
      <canvas ref={canvasRef} />
      <input
        min={1}
        max={10}
        step={0.01}
        className="mx-20"
        type="range"
        ref={speedRef}
      />
    </div>
  );
}

export default Parallax;
