import initCanvas from '../dist/src/index';
import { JSDOM } from 'jsdom';

const divDom = new JSDOM(`<div id='divDom'></div>`)
// const divDomWithStyle = new JSDOM(`<div id='divDomWithStyle' style = {{ width: 200, height: 200 }} > </div>`)
// const canvasDom = new JSDOM(`< canvas id = 'canvasDom' > </canvas>`)
// const canvasDomWithStyle = new JSDOM(`< canvas id = 'canvasDomWithStyle' style = {{ width: 200, height: 200 }} > </canvas>`)
// const divDomWithStyleGiveDom = new JSDOM(`< div id = 'divDomWithStyleGiveDom' ref = { divDomRef } style = {{ width: 200, height: 200 }} > </div>`)
// const canvasDomGiveDom = new JSDOM(`< canvas id = 'canvasDomGiveDom' ref = { canvseDomRef } style = {{ width: 200, height: 200 }} > </canvas>`)

// const divDomWithSize = new JSDOM(`< div id = 'divDomWithSize' > </div>`)

// const divDomWithStyleWithSize = new JSDOM(` < div id = 'divDomWithStyleWithSize' style = {{ width: 200, height: 200 }} > </div>`)
// const canvasDomWithSize = new JSDOM(`< canvas id = 'canvasDomWithSize' > </canvas>`)

// const canvasDomWithStyleWithSize = new JSDOM(`< canvas id = 'canvasDomWithStyleWithSize' style = {{ width: 200, height: 200 }} > </canvas>`)

// const divDomWithStyleGiveDomWithSize = new JSDOM(`< div id = 'divDomWithStyleGiveDomWithSize' ref = { divDomWithSizeRef } style = {{ width: 200, height: 200 }} > </div>`)
// const divDomWithStyleGiveDomWithSize = new JSDOM(`< canvas id = 'canvasDomGiveDomWithSize' ref = { canvseDomWithSizeRef } style = {{ width: 200, height: 200 }} > </canvas>`)



test("null", () => {
  expect(() => {
    initCanvas(divDom, 200, 200);
  }).toThrow(Error);
})