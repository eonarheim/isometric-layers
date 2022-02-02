import { Entity } from "./entity";

export class Tile implements Entity {
    public x: number;
    public y: number;
    public screenX: number;
    public screenY: number;
    public image: HTMLImageElement;
    elevation: number = 0;
    z: number = 0;
    constructor(x, y, screenX, screenY, public map: IsometricMap) { 
        this.x = x;
        this.y = y;
        this.screenX = screenX;
        this.screenY = screenY;
    }
    

    public draw(gfx: CanvasRenderingContext2D) {
        if (!this.image) return;
        const halfTileWidth = this.image.width / 2;
        gfx.save();
        // shift left origin to corner of map, not the left corner of the first sprite
        gfx.translate(-halfTileWidth, 0);
        gfx.translate(this.screenX, this.screenY);
        // shift the image up to draw from the bottom (minus tile height)
        gfx.drawImage(this.image, 0, -(this.image.height - this.map.tileHeightPx));

        gfx.restore();
    }
}

export class IsometricMap {
    public tiles: Tile[] = [];
    constructor(
        public screenX: number,
        public screenY: number,
        public widthInTiles: number,
        public heightInTiles: number,
        public tileWidthPx: number,
        public tileHeightPx: number) {
        // build up tile representation
        for (let y = 0; y < heightInTiles; y++) {
            for (let x = 0; x < widthInTiles; x++) {
                const screenPos = this.tileCoordinateToScreen(x, y);
                const tile = new Tile(x, y, screenPos[0] + screenX, screenPos[1] + screenY, this);
                this.tiles[x + y * widthInTiles] = tile;
            }
        }
    }

    /**
     * Returns the top left corner of the tile in screen coordinates
     */
    public tileCoordinateToScreen(tileX: number, tileY: number): [number, number] {
        const halfTileWidth = this.tileWidthPx / 2;
        const halfTileHeight = this.tileHeightPx / 2;
        // each screen x is right 1/2 and left 1/2
        const screenX = (tileX - tileY) * halfTileWidth;
        // each screen y is right 1/2 and down 1/2
        const screenY = (tileX + tileY) * halfTileHeight;
        return [screenX, screenY];
    }
}