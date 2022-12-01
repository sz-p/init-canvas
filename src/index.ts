interface DomInfo {
  dom: HTMLCanvasElement | HTMLElement,
  type?: 'HTMLCanvasElement' | 'HTMLElement',
  width?: number,
  height?: number,
}

export interface CanvasInfo {
  canvasContext: CanvasRenderingContext2D,
  canvasDom: HTMLCanvasElement,
  width: number,
  height: number
}

const getDom = function (dom: string | HTMLElement | null): DomInfo {
  if (!dom) {
    throw new Error('no input dom');
  }
  else if (typeof dom === 'string') {
    let elementDom = document.getElementById(dom);
    return getDom(elementDom);
  } else if (dom.constructor && dom.constructor['name'] === 'HTMLCanvasElement') {
    let canvasWidth = dom.clientWidth;
    let canvasHeight = dom.clientHeight;
    return {
      dom: <HTMLCanvasElement>dom,
      type: 'HTMLCanvasElement',
      width: canvasWidth,
      height: canvasHeight
    }
  } else {
    let domWidth = dom.clientWidth;
    let domHeight = dom.clientHeight;
    return {
      dom: <HTMLElement>dom,
      type: 'HTMLElement',
      width: domWidth,
      height: domHeight
    }
  }
}


const setCanvasAttr = function (domInfor: DomInfo, width?: number, height?: number): void {
  let canvasWidth = width || domInfor.width;
  let canvasHeight = height || domInfor.height;
  let canvasDom = <HTMLCanvasElement>domInfor.dom;

  if (!canvasWidth || !canvasHeight) {
    throw new Error('canvasDom have no size');
  }

  canvasDom.width = canvasWidth;
  canvasDom.height = canvasHeight;
}

const canvasDomHandle = function (domInfor: DomInfo, width?: number, height?: number): CanvasInfo {
  setCanvasAttr(domInfor, width, height);
  let canvasDom = <HTMLCanvasElement>domInfor.dom;
  return {
    canvasDom: canvasDom,
    canvasContext: <CanvasRenderingContext2D>canvasDom.getContext('2d'),
    width: canvasDom.width,
    height: canvasDom.height
  }
}

const createCanvas = function (width: number, height: number): HTMLCanvasElement {
  let canvasDom = document.createElement('canvas');
  setCanvasAttr({ dom: canvasDom }, width, height);
  return canvasDom;
}

const divDomHandle = function (domInfor: DomInfo, width?: number, height?: number): CanvasInfo {
  let divWidth = width || domInfor.width
  let divHeight = height || domInfor.height

  if (!divWidth || !divHeight) {
    throw new Error('divDom have no size');
  }
  let canvasDom = createCanvas(divWidth, divHeight);
  domInfor.dom.appendChild(canvasDom);

  return {
    canvasDom: <HTMLCanvasElement>canvasDom,
    canvasContext: <CanvasRenderingContext2D>canvasDom.getContext('2d'),
    width: canvasDom.width,
    height: canvasDom.height
  }
}

/**
 * input a dom or domId canvas or canvas DomId return canvas context and width height
 * 
 * @param dom Element or ID of a HTMLElement or HTMLCanvasElement object
 * @param width if width is undefined canvas width is container`s width
 * @param height if height is undefined canvas height is container`s height
 */
export default function (dom: HTMLCanvasElement | HTMLElement | string, width?: number, height?: number): CanvasInfo {
  let domInfo = getDom(dom);
  if (domInfo.type === 'HTMLCanvasElement') {
    return canvasDomHandle(domInfo, width, height);
  } else if (domInfo.type === 'HTMLElement') {
    return divDomHandle(domInfo, width, height);
  } else {
    throw new Error('no input dom');
  }
}
