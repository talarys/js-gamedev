import { useState } from 'react';
import useCanvas from '../hooks/useCanvas';
import shadowDogSrc from '../assets/shadow_dog.webp';

const shadowSprite = new Image();
shadowSprite.src = shadowDogSrc;
const spriteWidth = 575;
const spriteHeight = 523;

const animationStates = [
  { name: 'idle', frames: 7 },
  { name: 'jump', frames: 7 },
  { name: 'fall', frames: 7 },
  { name: 'run', frames: 9 },
  { name: 'dizzy', frames: 11 },
  { name: 'sit', frames: 5 },
  { name: 'roll', frames: 7 },
  { name: 'bite', frames: 7 },
  { name: 'ko', frames: 12 },
  { name: 'getHit', frames: 4 },
];

function SpriteAnimations() {
  const [animState, SetAnimState] = useState(0);

  const draw = (ctx, frameCount) => {
    const xOffset = ctx.canvas.width / 2 - 573 / 2;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(
      shadowSprite,
      (Math.floor(frameCount / 5) % animationStates[animState].frames) * spriteWidth,
      animState * spriteHeight,
      spriteWidth,
      spriteHeight,
      0 + xOffset,
      0,
      spriteWidth,
      spriteHeight,
    );
  };

  const canvasRef = useCanvas(draw);
  return (
    <div>
      <div className="mt-4 flex justify-center flex-wrap items-center gap-2">
        {animationStates.map(({ name }, index) => (
          <button
            onClick={() => SetAnimState(index)}
            key={name}
            type="button"
            className="bg-[#282828] rounded text-white py-4 w-24 hover:bg-[#353535]"
          >
            {name.toLocaleUpperCase()}
          </button>
        ))}
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default SpriteAnimations;
