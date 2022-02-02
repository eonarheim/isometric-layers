import { IsometricMap } from "./isometric-map";

import grass from './grass.png';
import box from './box.png';
import block from './block.png';
import { Player } from "./player";
import { Entity } from "./entity";

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 800;
document.body.appendChild(canvas);
const gfx = canvas.getContext('2d');

const grassImage = new Image();
grassImage.src = grass;

const boxImage = new Image();
boxImage.src = box;

const blockImage = new Image();
blockImage.src = block;

const ground = new IsometricMap(0, 0, 10, 10, 111, 64);
ground.tiles.forEach(t => t.image = grassImage);
ground.tiles.forEach(t => t.elevation = 0);

const boxes = new IsometricMap(0, -64, 10, 10, 111, 64);
boxes.tiles.forEach(t => t.image = Math.random() > .8 ? boxImage : null);
boxes.tiles.forEach(t => t.elevation = 1);

const player = new Player(blockImage, 64);
player.screenX = 100;
player.screenY = 100;
player.elevation = 1;

const entities = [...ground.tiles, ...boxes.tiles, player];

const processElevation = (entity: Entity) => {
    const maxZIndexPerElevation = Math.max(ground.widthInTiles * ground.tileWidthPx, ground.heightInTiles * ground.tileHeightPx);

    const newZ = maxZIndexPerElevation * entity.elevation + entity.screenY;

    entity.z = newZ;
}


const clearScreen = (gfx: CanvasRenderingContext2D) => {
    gfx.fillStyle = '#176BAA';
    gfx.fillRect(0, 0, canvas.width, canvas.height);
}

const mainloop = () => {
    requestAnimationFrame(mainloop);
    clearScreen(gfx);

    entities.forEach(e => processElevation(e));

    entities.sort((a, b) => {
        return a.z - b.z;
    });

    gfx.save();
    gfx.translate(400, 100);
    for (const entity of entities) {
        entity.draw(gfx);
    }

    gfx.restore();

}
mainloop();

document.addEventListener('keypress', (ev) => {
    const speed = 10;
    if (ev.key === 's') {
        player.screenY += speed;
    }
    if (ev.key === 'w') {
        player.screenY -= speed;
    }
    if (ev.key === 'a') {
        player.screenX -= speed;
    }
    if (ev.key === 'd') {
        player.screenX += speed;
    }
})