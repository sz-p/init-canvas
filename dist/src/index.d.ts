export interface CanvasInfor {
    canvasContext: CanvasRenderingContext2D;
    canvasDom: HTMLCanvasElement;
    width: number;
    height: number;
}
/**
 * input a dom or domId  canvas or canvseDomId return canvas context and width height
 * 
 * @param dom Element or ID of a HTMLDivElement or HTMLCanvasElement object
 * @param width if width is undefined canvas width is container`s width
 * @param height if height is undefined canvas height is container`s height
 */
export default function (dom: HTMLCanvasElement | HTMLDivElement | string, width?: number, height?: number): CanvasInfor;
