import { Entity } from "./entity";

export class Player implements Entity {
    screenX: number;
    screenY: number;
    elevation: number = 1;
    z: number = 0;
    constructor(public image: HTMLImageElement, public tileHeightPx: number) {}

    public draw(gfx: CanvasRenderingContext2D) {
        if (!this.image) return;
        const halfTileWidth = this.image.width / 2;
        gfx.save();
        // shift left origin to corner of map, not the left corner of the first sprite
        gfx.translate(-halfTileWidth, 0);
        gfx.translate(this.screenX, this.screenY);
        // shift the image up to draw from the bottom (minus tile height)
        gfx.drawImage(this.image, 0, -(this.image.height - this.tileHeightPx));

        gfx.restore();
    }
}