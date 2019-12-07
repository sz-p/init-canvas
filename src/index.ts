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
  } else if (dom.constructor && dom.constructor[name] === 'HTMLCanvasElement') {
    let canvasWidth = dom.clientWidth;
    let canvasHeight = dom.clientHeight;
    return {
      dom: <HTMLCanvasElement>dom,
      type: 'HTMLCanvasElement',
      width: canvasWidth,
      height: canvasHeight
    }
  } else if (dom.constructor && dom.constructor[name] === 'HTMLDivElement') {
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


const setCanvasAttr = function (domInfor: DomInfor, width: number, height: number): void {
  let canvaseWidth = width || domInfor.width;
  let canvaseHeight = height || domInfor.height;
  let canvasDom = domInfor.dom;

  if (!canvaseWidth || !canvaseHeight) {
    throw new Error('canvasDom have no size');
  }

  canvasDom[width] = canvaseWidth;
  canvasDom[height] = canvaseHeight;
}

const canvasDomHandle = function (domInfor: DomInfor, width: number, height: number): CanvasInfor {
  setCanvasAttr(domInfor, width, height);
  let canvasDom = <HTMLCanvasElement>domInfor.dom;
  return {
    canvasDom: canvasDom,
    canvasContext: <CanvasRenderingContext2D>canvasDom.getContext('2d'),
    width: domInfor.dom[width],
    height: domInfor.dom[height]
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

export default function (dom: HTMLElement | string, width?: number, height?: number): CanvasInfor {
  let domInfor = getDom(dom);
  if (domInfor.type === 'HTMLCanvasElement') {
    return canvasDomHandle(domInfor, width, height);
  } else if (domInfor.type === 'HTMLDivElement') {
    return divDomHandle(domInfor, width, height);
  } else {
    throw new Error('no input dom');
  }
}