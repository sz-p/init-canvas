var getDom = function (dom) {
    if (!dom) {
        throw new Error('no input dom');
    }
    else if (typeof dom === 'string') {
        var elementDom = document.getElementById(dom);
        return getDom(elementDom);
    }
    else if (dom.constructor && dom.constructor['name'] === 'HTMLCanvasElement') {
        var canvasWidth = dom.clientWidth;
        var canvasHeight = dom.clientHeight;
        return {
            dom: dom,
            type: 'HTMLCanvasElement',
            width: canvasWidth,
            height: canvasHeight
        };
    }
    else {
        var domWidth = dom.clientWidth;
        var domHeight = dom.clientHeight;
        return {
            dom: dom,
            type: 'HTMLElement',
            width: domWidth,
            height: domHeight
        };
    }
};
var setCanvasAttr = function (domInfor, width, height) {
    var canvasWidth = width || domInfor.width;
    var canvasHeight = height || domInfor.height;
    var canvasDom = domInfor.dom;
    if (!canvasWidth || !canvasHeight) {
        throw new Error('canvasDom have no size');
    }
    canvasDom.width = canvasWidth;
    canvasDom.height = canvasHeight;
};
var canvasDomHandle = function (domInfor, width, height) {
    setCanvasAttr(domInfor, width, height);
    var canvasDom = domInfor.dom;
    return {
        canvasDom: canvasDom,
        canvasContext: canvasDom.getContext('2d'),
        width: canvasDom.width,
        height: canvasDom.height
    };
};
var createCanvas = function (width, height) {
    var canvasDom = document.createElement('canvas');
    setCanvasAttr({ dom: canvasDom }, width, height);
    return canvasDom;
};
var divDomHandle = function (domInfor, width, height) {
    var divWidth = width || domInfor.width;
    var divHeight = height || domInfor.height;
    if (!divWidth || !divHeight) {
        throw new Error('divDom have no size');
    }
    var canvasDom = createCanvas(divWidth, divHeight);
    domInfor.dom.appendChild(canvasDom);
    return {
        canvasDom: canvasDom,
        canvasContext: canvasDom.getContext('2d'),
        width: canvasDom.width,
        height: canvasDom.height
    };
};
export default function (dom, width, height) {
    var domInfo = getDom(dom);
    if (domInfo.type === 'HTMLCanvasElement') {
        return canvasDomHandle(domInfo, width, height);
    }
    else if (domInfo.type === 'HTMLElement') {
        return divDomHandle(domInfo, width, height);
    }
    else {
        throw new Error('no input dom');
    }
}
//# sourceMappingURL=index.js.map