"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    else if (dom.constructor && dom.constructor['name'] === 'HTMLDivElement') {
        var divWidth = dom.clientWidth;
        var divHeight = dom.clientHeight;
        return {
            dom: dom,
            type: 'HTMLDivElement',
            width: divWidth,
            height: divHeight
        };
    }
    else {
        throw new Error('no input dom');
    }
};
var setCanvasAttr = function (domInfor, width, height) {
    var canvaseWidth = width || domInfor.width;
    var canvaseHeight = height || domInfor.height;
    var canvasDom = domInfor.dom;
    if (!canvaseWidth || !canvaseHeight) {
        throw new Error('canvasDom have no size');
    }
    canvasDom.width = canvaseWidth;
    canvasDom.height = canvaseHeight;
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
var createCanvase = function (width, height) {
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
    var canvasDom = createCanvase(divWidth, divHeight);
    domInfor.dom.appendChild(canvasDom);
    return {
        canvasDom: canvasDom,
        canvasContext: canvasDom.getContext('2d'),
        width: canvasDom.width,
        height: canvasDom.height
    };
};
function default_1(dom, width, height) {
    var domInfor = getDom(dom);
    if (domInfor.type === 'HTMLCanvasElement') {
        return canvasDomHandle(domInfor, width, height);
    }
    else if (domInfor.type === 'HTMLDivElement') {
        return divDomHandle(domInfor, width, height);
    }
    else {
        throw new Error('no input dom');
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map