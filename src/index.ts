interface DomInfor {
  dom: HTMLCanvasElement | HTMLDivElement,
  type?: 'HTMLCanvasElement' | 'HTMLDivElement',
  width?: number,
  height?: number,
}

export interface CanvasInfor {
  canvasContext: CanvasRenderingContext2D,
  canvasDom: HTMLCanvasElement,
  width: number,
  height: number
}

const getDom = function (dom: string | HTMLElement | null): DomInfor {
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
  } else if (dom.constructor && dom.constructor['name'] === 'HTMLDivElement') {
    let divWidth = dom.clientWidth;
    let divHeight = dom.clientHeight;
    return {
      dom: <HTMLDivElement>dom,
      type: 'HTMLDivElement',
      width: divWidth,
      height: divHeight
    }
  } else {
    throw new Error('no input dom');
  }
}


const setCanvasAttr = function (domInfor: DomInfor, width?: number, height?: number): void {
  let canvaseWidth = width || domInfor.width;
  let canvaseHeight = height || domInfor.height;
  let canvasDom = <HTMLCanvasElement>domInfor.dom;

  if (!canvaseWidth || !canvaseHeight) {
    throw new Error('canvasDom have no size');
  }

  canvasDom.width = canvaseWidth;
  canvasDom.height = canvaseHeight;
}

const canvasDomHandle = function (domInfor: DomInfor, width?: number, height?: number): CanvasInfor {
  setCanvasAttr(domInfor, width, height);
  let canvasDom = <HTMLCanvasElement>domInfor.dom;
  return {
    canvasDom: canvasDom,
    canvasContext: <CanvasRenderingContext2D>canvasDom.getContext('2d'),
    width: canvasDom.width,
    height: canvasDom.height
  }
}

const createCanvase = function (width: number, height: number): HTMLCanvasElement {
  let canvasDom = document.createElement('canvas');
  setCanvasAttr({ dom: canvasDom }, width, height);
  return canvasDom;
}

const divDomHandle = function (domInfor: DomInfor, width?: number, height?: number): CanvasInfor {
  let divWidth = width || domInfor.width
  let divHeight = height || domInfor.height

  if (!divWidth || !divHeight) {
    throw new Error('divDom have no size');
  }
  let canvasDom = createCanvase(divWidth, divHeight);
  domInfor.dom.appendChild(canvasDom);

  return {
    canvasDom: <HTMLCanvasElement>canvasDom,
    canvasContext: <CanvasRenderingContext2D>canvasDom.getContext('2d'),
    width: canvasDom.width,
    height: canvasDom.height
  }
}

/**
 * input a dom or domId canvas or canvseDomId return canvas context and width height
 * 
 * @param dom Element or ID of a HTMLDivElement or HTMLCanvasElement object
 * @param width if width is undefined canvas width is container`s width
 * @param height if height is undefined canvas height is container`s height
 */
export default function (dom: HTMLCanvasElement | HTMLDivElement | string, width?: number, height?: number): CanvasInfor {
  let domInfor = getDom(dom);
  if (domInfor.type === 'HTMLCanvasElement') {
    return canvasDomHandle(domInfor, width, height);
  } else if (domInfor.type === 'HTMLDivElement') {
    return divDomHandle(domInfor, width, height);
  } else {
    throw new Error('no input dom');
  }
}