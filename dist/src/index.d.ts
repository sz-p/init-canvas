export interface CanvasInfo {
    canvasContext: CanvasRenderingContext2D;
    canvasDom: HTMLCanvasElement;
    width: number;
    height: number;
}
export default function (dom: HTMLCanvasElement | HTMLElement | string, width?: number, height?: number): CanvasInfo;
