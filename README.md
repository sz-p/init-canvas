# init-canvas
input a dom or domId  canvas or canvseDomId return canvas context and width height

# Install
```shell
npm install init-canvas
```

# Interface

```typescript
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
export default function (dom: HTMLElement | string, width?: number, height?: number): CanvasInfor;
```


# Example

```html
<div id='divDom'></div>
<div id='divDomWithStyle' style={{ width: 200, height: 200 }} ></div>
<canvas id='canvasDom'></canvas>
<canvas id='canvasDomWithStyle' style={{ width: 200, height: 200 }} ></canvas>

<div id='divDomWithStyleGiveDom' ref={divDomRef} style={{ width: 200, height: 200 }} ></div>
<canvas id='canvasDomGiveDom' ref={canvseDomRef} style={{ width: 200, height: 200 }} ></canvas>


<div id='divDomWithSize'></div>
<div id='divDomWithStyleWithSize' style={{ width: 200, height: 200 }} ></div>
<canvas id='canvasDomWithSize'></canvas>
<canvas id='canvasDomWithStyleWithSize' style={{ width: 200, height: 200 }} ></canvas>

<div id='divDomWithStyleGiveDomWithSize' ref={divDomWithSizeRef} style={{ width: 200, height: 200 }} ></div>
<canvas id='canvasDomGiveDomWithSize' ref={canvseDomWithSizeRef} style={{ width: 200, height: 200 }} ></canvas>
```

```javascript
// input a divDom by id
canvasInfor = initCanvas('divDomWithStyle'); 

// canvasInfor {
//  canvasContext: CanvasRenderingContext2D {canvas: canvas, globalAlpha: 1, globalCompositeOperation: "source-over", filter: "none", imageSmoothingEnabled: true, …}
//  canvasDom: canvas
//  height: 200
//  width: 200
// }

// input a canvasDom by id
initCanvas('canvasDomWithStyle');
// input a divDom by dom
initCanvas(divDomRef.current);
// input a canvasDom by dom
initCanvas(canvseDomRef.current);

// with size
initCanvas('divDomWithStyleWithSize', 400, 400);

// canvasInfor {
//  canvasContext: CanvasRenderingContext2D {canvas: canvas, globalAlpha: 1, globalCompositeOperation: "source-over", filter: "none", imageSmoothingEnabled: true, …}
//  canvasDom: canvas
//  height: 400
//  width: 400
// }

initCanvas('canvasDomWithStyleWithSize', 400, 400);
initCanvas(divDomWithSizeRef.current, 400, 400);
initCanvas(canvseDomWithSizeRef.current, 400, 400);         
```

## TODO
[ ] use try catch and log error to replace throw error