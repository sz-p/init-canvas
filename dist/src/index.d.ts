export interface CanvasInfor {
    canvasContext: CanvasRenderingContext2D;
    canvasDom: HTMLCanvasElement;
    width: number;
    height: number;
}
export default function (dom: HTMLElement | string, width: number, height: number): CanvasInfor;
