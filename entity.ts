
export interface Entity {
    screenX: number;
    screenY: number;
    elevation: number;
    z: number;
    draw(gfx: CanvasRenderingContext2D): void;
}